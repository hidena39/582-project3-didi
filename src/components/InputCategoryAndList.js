import { useParams } from "react-router-dom";

function InputCategoryAndList() {
  const { storename } = useParams();
  const sendCategoryToDB = (e) => {
    e.preventDefault();
    console.log("submitted");
    let categoryToAdd = document.querySelector("#category").value;
    console.log("log", categoryToAdd);
    fetch(
      `https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/each-store/${storename}`,
      {
        method: "post",
        body: JSON.stringify({ category: categoryToAdd, items: [] }),
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
        document.querySelector("#category").value = "";
        window.location.reload(true);
      });
  };
  return (
    <div class="boxes" id="inputListBox">
      <h3>Add Category</h3>
      <form onSubmit={sendCategoryToDB}>
        <input type="text" id="category" placeholder="Category Name" required />
        <input class="submit" type="submit" value="Add Category" />
      </form>
      {/* <h3 id="addItem">Add item</h3>
    <form onSubmit={sendItemToDB}>
      <select name="categories" id="categories" required>
        <option value="">Please Select Category</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <input type="text" id="item" placeholder="Item Name" required />
      <input class="submit" type="submit" value="Add Item to the List" />
    </form> */}
    </div>
  );
}
export default InputCategoryAndList;
