import OneStore from "./OneStore";
import StoreStore from "./PiniaStorelist";

function StoreList() {
  const storeInfo = StoreStore(); // Get the data from the StoreStore component
  return (
    <div className="boxes" id="storeListBox">
      {storeInfo.length > 0 ? (
        <div className="storeCardList">
          {storeInfo.map((item) => (
            <OneStore key={item._id} name={item} />
          ))}
        </div>
      ) : (
        <div className="storeCardList">
          <h3>You don't have anything to shop right now!</h3>
        </div>
      )}
    </div>
  );
}

export default StoreList;
