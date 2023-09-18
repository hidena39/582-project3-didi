import StoreStore from "./PiniaStorelist";
import OneCategory from "./OneCategory";
import { useParams } from "react-router-dom";

function AllCategories() {
  const { storename } = useParams();
  //   console.log("storename", storename);
  const storeInfo = StoreStore();
  //   console.log("storeInfo", storeInfo);
  const chosenStore = storeInfo.filter((item) => item.storename === storename);
  //   console.log("chosenStore", chosenStore);
  if (chosenStore.length === 0) {
    return <h3>It seems this store no longer exist...?</h3>;
  }
  const allCategories = chosenStore[0].categories;
  console.log("allCategories", allCategories);
  return (
    <div>
      {allCategories.length > 0 ? (
        <div>
          {allCategories.map((categories, index) => (
            <OneCategory key={index} name={categories} />
          ))}
        </div>
      ) : (
        <h3>You don't have any category right now!</h3>
      )}
    </div>
  );
}

export default AllCategories;
