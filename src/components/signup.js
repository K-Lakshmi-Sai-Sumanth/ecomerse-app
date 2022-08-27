import image from '../assets/shopping logo.png'
import signup from "../styles/signup.module.css";
const Signup = () => {
    return (
        <div className={`${signup.container}`}>
            <div className={`col-12 ${signup.MainContainer}`}>
                <div className={`col-md-6 col-12 ${signup.logo}`}>
                    <img className={`col-6 col-md-12`} src={image} alt="logo"></img>
                </div>
                <div className={`col-md-6 col-12 ${signup.formContainer}`}>
                    <form className={`col-12`}>
                        <input
                            className={`${signup.emailInput} col-7`}
                            type="text"
                            placeholder="Enter your Gmail"
                        ></input>
                        <p className={`col-7 ${signup.para}`}>error message</p>
                        <input
                            className={`${signup.passwordInput} col-7`}
                            type="text"
                            placeholder="Enter your Password"
                        ></input>
                        <p className={`col-7 ${signup.para}`}>error message </p>
                        <input
                            className={`${signup.passwordInput} col-7`}
                            type="text"
                            placeholder="Confirm your Password"
                        ></input>
                        <p className={`col-7 ${signup.para}`}>error message </p>
                        <button type="button" className={`${signup.button} col-7`}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Signup;
