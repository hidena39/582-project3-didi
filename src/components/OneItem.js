import { useParams } from "react-router-dom";

function OneItem() {
  const { storename } = useParams();
  return <h1>OneItem</h1>;
}

export default OneItem;
