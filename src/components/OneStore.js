import { Link } from "react-router-dom";

function OneStore(props) {
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
    </div>
  );
}

export default OneStore;
