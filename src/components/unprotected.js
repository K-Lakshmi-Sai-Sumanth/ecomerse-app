import {
    Navigate
  } from "react-router-dom";

const UnProtected = (props) => {
    const Token = localStorage.getItem("ecommerse-authToken");
    console.log(Token)
    let loggedin = (Token !== "");
    if (loggedin) {
      return <Navigate to="/productfeed" />
    }
    return props.children
  }

  export default UnProtected;