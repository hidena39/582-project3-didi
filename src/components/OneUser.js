function OneUser(props) {
  return (
    <button className="userButton">
      {/* onClick = { currentUser }
     :class="{ chosenUser: oneUser === listuser.currentUser }"
     :style="{ backgroundColor: UserColor }" */}

      {props.name.username}
    </button>
  );
}

export default OneUser;
