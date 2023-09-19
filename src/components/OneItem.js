import StoreStore from "./PiniaStorelist";
import { useParams } from "react-router-dom";

function OneItem(props) {
  const { storename } = useParams();
  const storeInfo = StoreStore();
  const chosenStore = storeInfo.filter((item) => item.storename === storename);
  if (chosenStore.length === 0) {
    return <br></br>;
  }
  const allCategories = chosenStore[0].categories;
  const oneCategory = props.oneCategory;
  const allItems = allCategories.filter(
    (item) => item.category === oneCategory
  );
  if (allItems.length === 0) {
    return <br></br>;
  }
  const Items = allItems[0].items;
  if (Items.length === 0) {
    return <br></br>;
  }
  const oneItem = props.name.item;
  const anItem = Items.filter((item) => item.item === oneItem);
  if (anItem.length === 0) {
    return <br></br>;
  }
  const purchaseStatus = anItem[0].purchased;

  const deleteItem = () => {
    console.log("submitted");

    fetch(
      `https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/each-store/${storename}/deleteitem`,
      {
        method: "post",
        body: JSON.stringify({ category: oneCategory, item: oneItem }),
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
        window.location.reload(true);
      });
  };

  const changeStatus = () => {
    console.log("beforeChange", purchaseStatus);
    console.log("submitted");

    const oneCategory = this.oneCategory;
    const oneItem = this.oneItem;
    const changedStatus = !purchaseStatus;
    const personWhoBought = this.listuser.currentUser;
    fetch(
      `https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/each-store/${storename}/changestatus`,
      {
        method: "post",
        body: JSON.stringify({
          category: oneCategory,
          item: oneItem,
          purchased: changedStatus,
          byWho: personWhoBought,
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
        fetch(`https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/`)
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            window.location.reload(true);
          });
      });
  };

  return (
    <div class="oneItem" onClick={changeStatus}>
      <div className="oneItem">
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
    </div>
  );
}

export default OneItem;
