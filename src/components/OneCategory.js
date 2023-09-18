// import OneItem from "./OneItem";
import { useParams } from "react-router-dom";

function OneCategory(props) {
  const { storename } = useParams();
  console.log("storename", storename);
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
      {/* <div id="itemContainer">
      <OneItem
        v-for="item in items"
        :key="item.item"
        :oneItem="item.item"
        :oneCategory="oneCategory"
      /> */}
    </div>
  );
}

export default OneCategory;
