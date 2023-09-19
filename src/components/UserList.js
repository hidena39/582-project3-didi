import StoreUser from "./components/PiniaUserlist.vue";
import OneUser from "./components/OneUser.vue";

function UserList() {
  const userInfo = StoreUser();
  return (
    <div id="userlist">
      {userInfo.length > 0 ? (
        <>
          {userInfo.map((item) => (
            <OneUser key={item._id} name={item} />
          ))}
        </>
      ) : (
        <h3>No user to show you</h3>
      )}
    </div>
  );
}
export default UserList;
