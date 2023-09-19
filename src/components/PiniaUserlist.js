import { useState, useEffect } from "react";

function StoreUser() {
  const [UserInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch(
      "https://reimagined-eureka-7qvqxw66r4w3pww9-3000.app.github.dev/users"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUserInfo(json);
      });
  }, []);
  return UserInfo;
}
export default StoreUser;
