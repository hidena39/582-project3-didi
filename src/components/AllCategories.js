import { useParams } from "react-router-dom";
import OneCategory from "./OneCategory";

function AllCategories() {
  const { storename } = useParams();
  return (
    <>
      <h1>All categories</h1>
      <OneCategory />
    </>
  );
}

export default AllCategories;
