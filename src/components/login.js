
import loginStyle from "../styles/login.module.css";
import image from "../assets/shopping logo.png";
import { useState } from 'react';
import  axios  from 'axios';
import { object, string } from 'yup';
import {useNavigate}   from "react-router-dom";
const Login = () => {
    // console.log(localStorage)
/*------------------------useState-------------------------------*/ 
    const [inputValue, setInputValue] = useState({ loginId: "", password: "" });
    const [errorValues, setErrorValues] = useState({ loginId: "", password: "" });
    const [loading , setLoading] =useState(false)
    const navigate = useNavigate();

/*------------------------handle onChange-------------------------------*/     
    let handleOnchange = (key, value) => {
        setInputValue({ ...inputValue, [key]: value })
    }
/*------------------------User Schema setting errors-------------------------------*/ 
    let userSchema = object({
        loginId: string().email().required("Enter valid login Email"),
        password: string().required("Password is required")
    });

/*------------------------handle onClick-------------------------------*/ 
    let handleOnclick = () => {
        setLoading(true)
        userSchema.validate(inputValue, { abortEarly: false })
            .then((res) => {
                setErrorValues("")
                axios({
                    method: "Post",
                    url: "https://api.backendless.com/BFB1C5CE-4984-1444-FFC6-C5F99F8DF500/2D6508CA-D333-4FAD-A55C-94CF94272EB5/users/login",
                    
                    data: {
                        login: inputValue.loginId,
                        password: inputValue.password
                    }
                })
                .then((resp) => {
                    setLoading(false)
                    if(resp.status===200){
                        let token=resp.data["user-token"];
                        localStorage.setItem("ecommerse-authToken",token);
                        navigate('/productfeed');
                    }
                })
                .catch((erro) => {
                    setLoading(false)
                    setErrorValues({ loginId: erro.response.data.message, password: erro.response.data.message });
                    console.log(erro)
                });


            })
            .catch((error) => {
                setLoading(false)
                let errObj = {};
                error.inner.map((valerr) => {
                    errObj[valerr.path] = valerr.message;
                    return null
                })
                setErrorValues(errObj)
            })
    }
    return (
        <div className={`${loginStyle.container}`}>
            <div className={`col-12 ${loginStyle.MainContainer}`}>
                <div className={`col-md-6 col-12 ${loginStyle.logo}`}>
                    <img className={`col-6 col-md-12`} src={image} alt="logo"></img>
                </div>
                <div className={`col-md-6 col-12 ${loginStyle.formContainer}`}>
                    <form className={`col-12`}>
                        <input
                            className={`${loginStyle.emailInput} col-7`}
                            type="text"
                            placeholder="Enter your Gmail"
                            onChange={(e) => handleOnchange("loginId", e.target.value)}
                            value={inputValue.loginId}
                        ></input>
                        <p className={`col-7 ${loginStyle.para}`}>{errorValues.loginId}</p>
                        <input
                            className={`${loginStyle.passwordInput} col-7`}
                            type="text"
                            placeholder="Enter your Password"
                            onChange={(e) => handleOnchange("password", e.target.value)}
                            value={inputValue.password}
                        ></input>
                        <p className={`col-7 ${loginStyle.para}`}>{errorValues.password}</p>
                      
                        <button type="button" onClick={handleOnclick} className={`${loginStyle.button} col-7`}>
                            Login
                        </button>
                    </form>
                    <p className={loginStyle.anchortag}> Don't have an account ? <a href="/Signup">Signup</a> here</p>
                    {
                        loading ? <div style={{width: "100%",textAlign:"center", visibility: "visible", color: "#ffffff" }}>Loading &nbsp; <div class="spinner-border spinner-border-sm" role="status">
                         <span class="sr-only">Loading...</span>
                       </div>
                       <div class="spinner-grow spinner-grow-sm" role="status">
                         <span class="sr-only">Loading...</span>
                       </div></div> : <div style={{width: "100%",textAlign:"center", visibility:"hidden" }}><div class="spinner-border spinner-border-sm" role="status">
                       <span class="sr-only">Loading...</span>
                     </div>
                     <div class="spinner-grow spinner-grow-sm" role="status">
                       <span class="sr-only">Loading...</span>
                     </div></div>
                     
                     }
                   
                </div>
                
            </div>
        </div>
    );
};
export default Login;
