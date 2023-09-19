import StoreStore from "./PiniaStorelist";
import OneItem from "./OneItem";
import { useParams } from "react-router-dom";

function OneCategory(props) {
  const { storename } = useParams();
  console.log("storename", storename);
  const storeInfo = StoreStore();
  const chosenStore = storeInfo.filter((item) => item.storename === storename);
  if (chosenStore.length === 0) {
    return <br></br>;
  }
  const allCategories = chosenStore[0].categories;
  console.log("categories", allCategories);
  const allItems = allCategories.filter(
    (item) => item.category === props.name.category
  );
  if (allItems.length === 0) {
    return <br></br>;
  }
  const Items = allItems[0].items;

  const deleteCategory = () => {
    console.log("submitted");
    const oneCategory = props.name.category;
    // const storename = storename;
    fetch(
      `https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/each-store/${storename}/deletecategory`,
      {
        method: "post",
        body: JSON.stringify({ category: oneCategory }),
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
        window.location.reload(true);
      });
  };

  return (
    <div className="listcontainer">
      <h3>{props.name.category}</h3>
      <button className="deleteButton" onClick={deleteCategory}>
        delete category
      </button>

      {Items.length > 0 ? (
        <div id="itemContainer">
          {Items.map((item, index) => (
            <OneItem
              key={index}
              name={item}
              oneCategory={props.name.category}
            />
          ))}
        </div>
      ) : (
        <div id="itemContainer">
          <h3>There are no items in this category</h3>
        </div>
      )}
    </div>
  );
}

export default OneCategory;
