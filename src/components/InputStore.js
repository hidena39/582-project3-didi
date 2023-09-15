function InputStore() {
  const sendStoreToDB = (e) => {
    e.preventDefault();
    console.log("submitted");
    let storename = document.querySelector("#storename").value;
    const formData = { storename };
    console.log(storename);
    //adding store name to db
    fetch("https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        console.log(data);
        document.querySelector("#storename").value = "";
      });
  };
  return (
    <div class="boxes" id="inputStoreBox">
      <h2>Add stores</h2>
      <form onSubmit={sendStoreToDB}>
        <input type="text" id="storename" placeholder="Store Name" required />
        <input class="submit" type="submit" value="Add store" />
      </form>
    </div>
  );
}
export default InputStore;
