import {
    Navigate
  } from "react-router-dom";


const Protected = (props) => {
    const Token = localStorage.getItem("ecommerse-authToken");
    let loggedin = (Token !== "");
    if (loggedin) {
      return props.children
    } return <Navigate to="/login" />
  }

  export default Protected