import OneItem from "./OneItem";
import { useParams } from "react-router-dom";

function OneCategory() {
  const { storename } = useParams();
  return (
    <div>
      <h1>OneCategory</h1>
      <OneItem />
    </div>
  );
}

export default OneCategory;
