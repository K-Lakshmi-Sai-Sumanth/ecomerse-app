import image from '../assets/shopping logo.png'
import signup from "../styles/signup.module.css";
import {useNavigate} from 'react-router-dom'
import { string, object} from 'yup'
import {useState} from 'react';
import axios from 'axios';

export let name="";
export let email="";
const Signup = () => {
    const [inputValue, setInputValue]= useState({name:"",email:"",password:""});
    const [errorValue, setErrorValue]= useState({name:"",email:"",password:""});
    const [loading , setLoading] =useState(false)
    const navigate = useNavigate();

/*------------------------handle onChange-------------------------------*/ 
    let handleOnchange=(key, value)=>{
        setInputValue({...inputValue, [key]:value})
    }

/*------------------------schema validations-------------------------------*/ 
let userSchema = object({
    name: string().min(8, "Must Contain 8 Characters").max(15, "Max 15 characters only").required("Name is required"),
    
    email: string().email("Enter must be valid Email").required("Email is required"),
   
    password:
    string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
  });

/*------------------------handle onClick-------------------------------*/ 
    const handleOnclick=()=>{
        setLoading(true)
        userSchema.validate(inputValue, {abortEarly: false} )
        .then((res)=>{
            setErrorValue("")

            axios({
                url:"https://api.backendless.com/BFB1C5CE-4984-1444-FFC6-C5F99F8DF500/2D6508CA-D333-4FAD-A55C-94CF94272EB5/users/register",
                method: "Post",
                data:{
                    name: inputValue.name,
                    email: inputValue.email,
                    password: inputValue.password
                }
            })
            .then((resp)=>{
                setLoading(false)
                if(resp.status ===200){
                    
                  console.log(resp)
                    email=resp.data.email
                    name= resp.data.name;
                  navigate("/login");
                  
                }
            })
            .catch((erro)=>{setLoading(false); console.log(erro)})


        })
        .catch((error)=>{
            setLoading(false)
            let errObj={};
            error.inner.map((errvalues)=>{
                errObj[errvalues.path]=errvalues.message;
                return NaN;
            })
            setErrorValue(errObj)
            
        })
        
        
        

    }
       
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
                            placeholder="Enter your Name"
                            onChange={(e)=>handleOnchange("name", e.target.value)}
                            value={inputValue.name}

                        ></input>
                        <p className={`col-7 ${signup.para}`}>{errorValue.name}</p>
                        <input
                            className={`${signup.passwordInput} col-7`}
                            type="text"
                            placeholder="Enter your Gmail"
                            onChange={(e)=>handleOnchange("email", e.target.value)}
                            value={inputValue.email}
                        ></input>
                        <p className={`col-7 ${signup.para}`}>{errorValue.email}</p>
                        <input
                            className={`${signup.passwordInput} col-7`}
                            type="text"
                            placeholder="Enter your Password"
                            onChange={(e)=>handleOnchange("password", e.target.value)}
                            value={inputValue.password}
                        ></input>

                        <p className={`col-7 ${signup.para}`}>{errorValue.password}</p>

                        <button type="button" onClick={handleOnclick} className={`${signup.button} col-7`}>
                            Signup
                        </button>
                        <p className={signup.anchortag}> Already have an account ? <a href="/login">Login</a> here </p>
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;

