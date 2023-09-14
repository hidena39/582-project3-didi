import { useState, useEffect } from "react";

function StoreStore() {
  const [StoreInfo, setStoreInfo] = useState([]);

  useEffect(() => {
    fetch("https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setStoreInfo(json);
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts.

  return StoreInfo;
}
export default StoreStore;
