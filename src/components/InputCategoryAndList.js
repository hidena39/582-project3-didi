import StoreStore from "./PiniaStorelist";
import { useParams } from "react-router-dom";

function InputCategoryAndList() {
  const { storename } = useParams();
  const storeInfo = StoreStore();
  const chosenStore = storeInfo.filter((item) => item.storename === storename);
  if (chosenStore.length === 0) {
    return <h3>It seems this store no longer exist...?</h3>;
  }
  const allCategories = chosenStore[0].categories;

  const sendCategoryToDB = (e) => {
    e.preventDefault();
    console.log("submitted");
    let categoryToAdd = document.querySelector("#category").value;
    console.log("log", categoryToAdd);
    fetch(
      `https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/each-store/${storename}`,
      {
        method: "post",
        body: JSON.stringify({ category: categoryToAdd, items: [] }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        console.log(data);
        document.querySelector("#category").value = "";
        window.location.reload(true);
      });
  };
  const sendItemToDB = (e) => {
    e.preventDefault();
    console.log("submitted");
    let categoryToAddItem = document.querySelector("#categories").value;
    let itemToAdd = document.querySelector("#item").value;
    console.log("log", categoryToAddItem, itemToAdd);
    console.log("storenamelog", storename);
    fetch(
      `https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/each-store/${storename}/item`,
      {
        method: "post",
        body: JSON.stringify({
          category: categoryToAddItem,
          item: itemToAdd,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        console.log(data);
        document.querySelector("#categories").value = "";
        document.querySelector("#item").value = "";
        window.location.reload(true);
      });
  };

  return (
    <div class="boxes" id="inputListBox">
      <h3>Add Category</h3>
      <form onSubmit={sendCategoryToDB}>
        <input type="text" id="category" placeholder="Category Name" required />
        <input class="submit" type="submit" value="Add Category" />
      </form>

      <h3 id="addItem">Add item</h3>
      <form onSubmit={sendItemToDB}>
        {allCategories.length > 0 ? (
          <select name="categories" id="categories" required>
            <option value="">Please Select Category</option>
            {allCategories.map((categories, index) => (
              <option key={index} value={categories.category}>
                {categories.category}
              </option>
            ))}
          </select>
        ) : (
          <select name="categories" id="categories" required>
            <option value="">Please Select Category</option>
          </select>
        )}

        <input type="text" id="item" placeholder="Item Name" required />
        <input class="submit" type="submit" value="Add Item to the List" />
      </form>
    </div>
  );
}
export default InputCategoryAndList;
