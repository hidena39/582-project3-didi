import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import lookingathomeImage from "../assets/looking-at-home.png";
import listImage from "../assets/list.png";
import AllCategories from "../components/AllCategories";
import InputCategoryAndList from "../components/InputCategoryAndList";
import UserList from "../components/UserList";

function EachstorePage() {
  const { storename } = useParams();
  return (
    <div class="listPageContainer">
      <nav>
        <Link to="/">
          <img id="homeImage" src={lookingathomeImage} alt="" />
          <div id="textHome">home</div>
        </Link>
      </nav>
      <h2>{storename}</h2>
      <img id="listImage" src={listImage} alt="" />
      <InputCategoryAndList />
      <AllCategories />
    </div>
  );
}

export default EachstorePage;
