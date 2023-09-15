import StoreList from "../components/StoreList";
import InputStore from "../components/InputStore";

function HomePage() {
  return (
    <div class="homePageContainer">
      <div class="boxes" id="titleBox">
        <div id="iconFamily">
          <img src="@/src/assets/family.png" alt="" />
        </div>
        <h1>Team Shop!!</h1>
      </div>
      <InputStore />
      <StoreList />
      <div id="iconTeam">
        <img src="@/src/assets/team-work.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
