import { useParams } from "react-router-dom";

function OneItem(props) {
  const { storename } = useParams();
  const oneCategory = props.oneCategory;

  const deleteItem = () => {
    console.log("submitted");
    const oneItem = props.name.item;

    fetch(
      `https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/each-store/${storename}/deleteitem`,
      {
        method: "post",
        body: JSON.stringify({ category: oneCategory, item: oneItem }),
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
    // <div class="oneItem" onClick="changeStatus">
    <div class="oneItem">
      <div className="itemBorder">
        <p>{props.name.item}</p>
        <button className="deleteButton" onClick={deleteItem}>
          delete
        </button>
        {/* <div
          className="purchased"
           v-if="purchaseStatus"
          onClick={changeStatus}
           :style="{ backgroundColor: colorOfThePurchased }"
        ></div> */}
      </div>
      {/* <div class="purchasedTime" v-if="purchaseStatus">{{ purchasedTime }}</div> */}
    </div>
  );
}

export default OneItem;
