import { useState, useEffect } from "react";
import StoreUser from "./PiniaUserlist";

let currentUser;
let currentUserColor;
let isAuthorized;
let UserColor;

function OneUser(props) {
  const userInfo = StoreUser();
  console.log("userinfo", userInfo);
  //   const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserColor, setCurrentUserColor] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkUserColor();
    isItAuthorised();
  }, [currentUser]);
  console.log(currentUser, currentUserColor, isAuthorized);

  const changeCurrentUser = () => {
    setCurrentUser(props.name.username);
  };

  const checkUserColor = () => {
    let findColor = "";
    if (userInfo.length === 0) {
    } else if (userInfo.length > 0) {
      for (let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].username === currentUser) {
          findColor = userInfo[i].color;
        }
      }
      setCurrentUserColor(findColor);
    }
  };

  const isItAuthorised = () => {
    let isItAdmin = false;
    if (userInfo.length === 0) {
    } else if (userInfo.length > 0) {
      for (let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].username === currentUser) {
          if (userInfo[i].role === "Admin") {
            isItAdmin = true;
          } else {
            isItAdmin = false;
          }
        }
      }
      setIsAuthorized(isItAdmin);
    }
  };

  const UserColor = () => {
    let theColor = "";
    if (userInfo.length === 0) {
    } else if (userInfo.length > 0) {
      for (const user of userInfo) {
        if (user.username === props.name.username) {
          theColor = user.color;
        }
      }
      return theColor;
    }
  };

  const removeChosenClass = () => {
    let removing = document.querySelectorAll(".userButton");
    console.log("removing", removing);
    const ArrayRemoving = Array.from(removing);
    console.log("ArrayRemoving", ArrayRemoving);
    for (let i = 0; i < ArrayRemoving.length; i++) {
      ArrayRemoving[i].classList.remove("chosenUser");
    }
  };

  return (
    <button
      className={`userButton ${
        currentUser === props.name.username ? "chosenUser" : ""
      }`}
      style={{ backgroundColor: UserColor() }}
      onClick={() => {
        removeChosenClass();
        changeCurrentUser();
      }}
    >
      {props.name.username}
    </button>
  );
}

export { OneUser, currentUser, currentUserColor, isAuthorized, UserColor };
