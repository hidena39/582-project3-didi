const express = require("express");
const app = express();
const port = 3000;

var cors = require("cors");
//permission to take things from other websites
app.use(cors());
//anyone asks can take data from this public folder
app.use("/static", express.static("/public"));
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});
const bodyParser = require("body-parser");

const { MongoClient, Timestamp } = require("mongodb");
// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://2295439:Pennypoopoppins1@cluster0.hkarpnq.mongodb.net/?retryWrites=true&w=majority";

// parse application/json
app.use(bodyParser.json());

//getting stores
app.get("/", (req, res) => {
  const client = new MongoClient(uri);
  async function run() {
    try {
      const database = client.db("mongodemo");
      const stores = database.collection("stores");
      const result = await stores.find({}).toArray();
      console.log(result);
      res.send(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
});

//getting users
app.get("/users", (req, res) => {
  const client = new MongoClient(uri);
  async function run() {
    try {
      const database = client.db("mongodemo");
      const users = database.collection("users");
      const result = await users.find({}).toArray();
      console.log(result);
      res.send(result);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

//adding store names
app.post("/", (req, res) => {
  console.log(req.body);
  const client = new MongoClient(uri);
  async function run() {
    try {
      const database = client.db("mongodemo");
      const stores = database.collection("stores");
      const result = await stores.insertOne(req.body);
      console.log(result);
      res.send(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  // res.send("Sent data via POST!");
});

//adding categories
app.post("/each-store/:storename", (req, res) => {
  const storename = req.params.storename;
  console.log("req", req.body);
  const client = new MongoClient(uri);
  console.log("current store name", storename);
  const categoryToAdd = req.body.category;
  console.log(categoryToAdd);
  async function run() {
    try {
      const database = client.db("mongodemo");
      const stores = database.collection("stores");
      const filter = { storename: storename };
      const updateDoc = {
        $addToSet: { categories: { category: categoryToAdd, items: [] } },
      };
      const result = await stores.updateOne(filter, updateDoc);
      console.log(result);
      res.send(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  // res.send("Sent data via POST!");
});

//adding items
app.post("/each-store/:storename/item", (req, res) => {
  const storename = req.params.storename;
  console.log("req", req.body);
  const client = new MongoClient(uri);
  console.log("current store name", storename);
  const categoryToAddItem = req.body.category;
  const itemToAdd = req.body.item;
  const newItem = { item: itemToAdd, purchased: false, time: "", byWho: "" };
  async function run() {
    try {
      const database = client.db("mongodemo");
      const stores = database.collection("stores");
      const store = await stores.findOne({ storename: storename });
      console.log("find", store);
      console.log("categorytoadditem", categoryToAddItem);
      console.log("itemtoadd", itemToAdd);
      const categoryObject = store.categories.find(
        (category) => category.category === categoryToAddItem
      );
      categoryObject.items.push(newItem);
      const result = await stores.updateOne(
        { _id: store._id },
        { $set: { categories: store.categories } }
      );
      console.log(result);
      res.send(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  // res.send("Sent data via POST!");
});

//deleting a store
app.post("/deleteOneStore", (req, res) => {
  const client = new MongoClient(uri);
  const storeToDelete = req.body.storename;
  async function run() {
    try {
      console.log(req.body);
      const database = client.db("mongodemo");
      const stores = database.collection("stores");
      const result = await stores.findOneAndDelete({
        storename: storeToDelete,
      });
      console.log(result);
      res.send(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  // res.send("Sent data via POST!");
});

//deleting a category
app.post("/each-store/:storename/deletecategory", (req, res) => {
  const storename = req.params.storename;
  console.log("req", req.body);
  const client = new MongoClient(uri);
  console.log("current store name", storename);
  const categoryToDelete = req.body.category;
  async function run() {
    try {
      const database = client.db("mongodemo");
      const stores = database.collection("stores");
      const store = await stores.findOne({ storename: storename });
      console.log("find", store);

      const findCategories = store.categories.filter(
        (category) => category.category !== categoryToDelete
      );
      console.log("findCategories", findCategories);
      const result = await stores.updateOne(
        { _id: store._id },
        { $set: { categories: findCategories } }
      );
      console.log(result);
      res.send(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  // res.send("Sent data via POST!");
});

//deleting items
app.post("/each-store/:storename/deleteitem", (req, res) => {
  const storename = req.params.storename;
  console.log("req", req.body);
  const client = new MongoClient(uri);
  console.log("current store name", storename);
  const categoryToDeleteItem = req.body.category;
  const itemToDelete = req.body.item;
  console.log(categoryToDeleteItem, itemToDelete);
  async function run() {
    try {
      const database = client.db("mongodemo");
      const stores = database.collection("stores");
      const store = await stores.findOne({ storename: storename });
      console.log("find", store);
      const categoryObject = store.categories.find(
        (category) => category.category === categoryToDeleteItem
      );
      console.log("categoryObject", categoryObject);
      const findItems = categoryObject.items.filter(
        (items) => items.item !== itemToDelete
      );
      console.log("findItems", findItems);
      const result = await stores.updateOne(
        { _id: store._id, "categories.category": categoryToDeleteItem },
        { $set: { "categories.$.items": findItems } }
      );
      //$ is like [i]
      console.log(result);
      res.send(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  // res.send("Sent data via POST!");
});

//changing purchased status
app.post("/each-store/:storename/changestatus", (req, res) => {
  const storename = req.params.storename;
  console.log("req", req.body);
  const client = new MongoClient(uri);
  console.log("current store name", storename);
  const categoryToChangeStatus = req.body.category;
  const itemToChangeStatus = req.body.item;
  const changedPurchaseStatus = req.body.purchased;
  const markWhoBought = req.body.byWho;
  const clickedDate = new Date();
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // AM or PM
  };
  const purchasedDate = clickedDate.toLocaleString(undefined, options);
  console.log(
    categoryToChangeStatus,
    itemToChangeStatus,
    changedPurchaseStatus,
    markWhoBought
  );
  async function run() {
    try {
      const database = client.db("mongodemo");
      const stores = database.collection("stores");
      const store = await stores.findOne({ storename: storename });
      console.log("find", store);
      const categoryObject = store.categories.find(
        (category) => category.category === categoryToChangeStatus
      );
      console.log("categoryObject", categoryObject);
      const itemObject = categoryObject.items.find(
        (items) => items.item === itemToChangeStatus
      );
      console.log("itemObject", itemObject);
      const result = await stores.updateMany(
        { _id: store._id },
        {
          $set: {
            "categories.$[category].items.$[item].purchased":
              changedPurchaseStatus,
            "categories.$[category].items.$[item].time": purchasedDate,
            "categories.$[category].items.$[item].byWho": markWhoBought,
          },
        },
        {
          arrayFilters: [
            { "category.category": categoryToChangeStatus },
            { "item.item": itemToChangeStatus },
          ],
        }
      );
      console.log(result);
      res.send(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  // res.send("Sent data via POST!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
