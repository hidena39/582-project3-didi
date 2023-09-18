import OneStore from "./OneStore";
import StoreStore from "./PiniaStorelist";

function StoreList() {
  const storeInfo = StoreStore(); // Get the data from the StoreStore component
  return (
    <div>
      {storeInfo.length > 0 ? (
        <div>
          {storeInfo.map((item) => (
            <OneStore key={item._id} name={item} />
          ))}
        </div>
      ) : (
        <h3>You don't have anything to shop right now!</h3>
      )}
    </div>
  );
}

export default StoreList;
