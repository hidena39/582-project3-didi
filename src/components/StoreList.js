import OneStore from "./OneStore";
import StoreStore from "../components/PiniaStorelist";

function StoreList() {
  const storeInfo = StoreStore(); // Get the data from the StoreStore component
  return (
    <div>
      {storeInfo.length > 0 ? (
        <div>
          {/* <OneStore key={storeInfo[0]._id} name={storeInfo[0]} /> */}
          {storeInfo.map((item) => (
            <OneStore key={item._id} name={item} />
          ))}
        </div>
      ) : (
        <p>You don't have anythiung to shop right now!</p>
      )}
    </div>
  );
}

export default StoreList;
