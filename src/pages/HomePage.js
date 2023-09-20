import StoreList from "../components/StoreList";

import InputStore from "../components/InputStore";
import familyImage from "../assets/family.png";
import teamWork from "../assets/team-work.png";

function HomePage() {
  return (
    <div class="homePageContainer">
      <div class="boxes" id="titleBox">
        <div id="iconFamily">
          <img src={familyImage} alt="" />
        </div>
        <h1>Team Shop!!</h1>
      </div>
      <InputStore />
      <StoreList />
      <div id="iconTeam">
        <img src={teamWork} alt="" />
      </div>
    </div>
  );
}

export default HomePage;
