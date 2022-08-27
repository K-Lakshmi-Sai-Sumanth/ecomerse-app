import loginStyle from "../styles/login.module.css";
import image from "../assets/shopping logo.png";
const Login = () => {
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
                    ></input>
                    <p className={`col-7 ${loginStyle.para}`}>error message</p>
                    <input
                        className={`${loginStyle.passwordInput} col-7`}
                        type="text"
                        placeholder="Enter your Password"
                    ></input>
                    <p className={`col-7 ${loginStyle.para}`}>error message </p>
                    <button type="button" className={`${loginStyle.button} col-7`}>
                        Login
                    </button>
                </form>
                <p className={loginStyle.anchortag}> Don't have an account ? <a href="/Signup">Signup</a> here</p>
            </div>
        </div>
        </div>
    );
};
export default Login;
