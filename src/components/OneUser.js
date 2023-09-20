import { useState, useEffect } from "react";
import StoreUser from "./PiniaUserlist";

let currentUser;
let currentUserColor;
let isAuthorized;

function OneUser(props) {
  const userInfo = StoreUser();
  console.log("userinfo", userInfo);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserColor, setCurrentUserColor] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    console.log("currentUser:", currentUser);
    console.log("currentUserColor:", currentUserColor);
    console.log("isAuthorized:", isAuthorized);
  }, [currentUser, currentUserColor, isAuthorized]);
  console.log(currentUser, currentUserColor, isAuthorized);

  const changeCurrentUser = () => {
    setCurrentUser(props.name.username);
  };
  console.log("currentuser", currentUser);
  const checkUserColor = () => {
    let findColor = "";
    if (userInfo.length === 0) {
      return;
    }
    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].username === currentUser) {
        findColor = userInfo[i].color;
      }
    }
    setCurrentUserColor(findColor);
  };
  console.log("stateColor?", currentUserColor);

  const isItAuthorised = () => {
    let isItAdmin = false;
    if (userInfo.length === 0) {
      return;
    }
    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].username === currentUser) {
        if (userInfo[i].role === "Admin") {
          isItAdmin = true;
        } else {
          isItAdmin = false;
        }
      }
    }
    console.log("stateAdmin?", isItAdmin);
    setIsAuthorized(isItAdmin);
  };

  return (
    <button
      className={`userButton ${
        currentUser === props.name.username ? "chosenUser" : ""
      }}`}
      onClick={() => {
        changeCurrentUser();
        checkUserColor();
        isItAuthorised();
      }}
    >
      {props.name.username}
    </button>
  );
}

export { OneUser, currentUser, currentUserColor, isAuthorized };
