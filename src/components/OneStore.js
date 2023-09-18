import { Link } from "react-router-dom";

function OneStore(props) {
  const deleteStore = () => {
    console.log("submitted");
    const storename = `${props.name.storename}`;

    fetch(
      `https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/deleteOneStore`,
      {
        method: "post",
        body: JSON.stringify({ storename: storename }),
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

  return (
    <div class="storeCard">
      <Link to={`/each-store/${props.name.storename}`}>
        <div id="storeCardRouter">
          <div class="cardTextBox">
            <span>visit</span>
            <h3>{props.name.storename}</h3>
            <span>list</span>
          </div>
        </div>
      </Link>
      <button class="deleteButton" onClick={deleteStore}>
        <p>delete store</p>
      </button>
    </div>
  );
}

export default OneStore;
