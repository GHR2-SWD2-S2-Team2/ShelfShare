import React, { useContext } from "react";
import { userContext } from "../../Context/userContext";
function Navbar() {
  let { isLogin } = useContext(userContext);
  return (
    <>
      <h2>Navbar</h2>
    </>
  );
}

export default Navbar;
