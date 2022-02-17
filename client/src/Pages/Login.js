import '../Components/LoginSignUp/Login.css'
import { useDispatch ,useSelector} from "react-redux";
import { useEffect, useState } from 'react';
import {verifyEmail,signInWithEmail} from '../redux/actions/authActions'
import { Link, useNavigate } from "react-router-dom";
import Googlelogin from '../Components/GoogleLogin/Googlelogin';
import LoadingButton from '@mui/lab/LoadingButton';
import {resetErrorMessage} from '../redux/actions/authActions'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

 

const LoginSignUp = () => {

  

  const [loading, setLoading] = useState(false);
  // window.localStorage.removeItem('jwt');
  const responseStatusCode= useSelector((state) => state.auth.loginStatusCode);
  const loginWithEmailResponse=useSelector((state)=>state.auth.loginWithEmailResponse)
  const errorMessage=useSelector((state)=>state.auth.errorMessage)

  
  
  

  const navigate = useNavigate();
  const dispatch=useDispatch();

 const [email,setEmail]= useState('')

 const [password,setPassword]=useState('')


 //ErrorMessage
var Message;

 //user-login-verification
if(loginWithEmailResponse.data){
  dispatch(resetErrorMessage)
  if(loginWithEmailResponse.data.user_token){
    localStorage.setItem("jwt",loginWithEmailResponse.data.user_token);
    navigate('/dashboard');
}
}
else if(responseStatusCode===200){
  dispatch(resetErrorMessage)
  navigate('/otpPage',{
    state:{Email:email,verification:'EMAIL_VERIFICATION'}
  });

}else if(errorMessage) {
  
  Message=errorMessage
  // setLoading(false);
}
 


 useEffect(()=>{
  setLoading(false);
 },[Message]);
 


 

const handleClick1=()=>{
  dispatch(resetErrorMessage)
  Message=''
    document.getElementById("container").classList.add("right-panel-active");
}
const handleClick2=()=>{
  Message=''
  dispatch(resetErrorMessage)
    document.getElementById("container").classList.remove("right-panel-active");
}

const handleSubmitSignIn=()=>{
  setLoading(true);
    dispatch(signInWithEmail(email,password))
  
}

const handleSubmitSignUp=()=>{
  setLoading(true);
  dispatch(verifyEmail(email));
  
}

    return ( 
        <div className="body">
        
    
        <div className="container" id="container">
          <div>
            <div className="form-container sign-up-container">
              <div className="signup-form form2">
                <h1 className='h1'>Create Account</h1>
    
                
                <div>
                  <input
                    className="signup-email input"
                    type="email"
                    name="email"
                    placeholder=" &#xf0e0;  Email"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
               
                
                {/* <button style={{width:'18rem'}} onClick={handleSubmitSignUp} className="submit button">Verify Email</button> */}
                <LoadingButton
                style={{width:'18rem',color:'white',background:'#F0BC5E',borderRadius:'10px',margin:'20px',height:'2.8rem'}}
                className='submit button'
        onClick={handleSubmitSignUp}
        endIcon={<ArrowForwardIosIcon/>}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Verify Email
      </LoadingButton>

                <p style={{color:'black'}}>{Message}</p>
                
                <Googlelogin />
              </div>
             
            </div>
            <div className="form-container sign-in-container">
            
            <div className='signin-form form2'>

      
                <h1 className='h1'>Sign In</h1>
                <div>
                  <input
                    className="signin-email input"
                    type="email"
                    name="email"
                    placeholder=" &#xf0e0;  Email"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="signin-password input"
                    type="password"
                    name="password"
                    placeholder="&#xf023;  Password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <Link to='/verifyEmail'>Forgot Password?</Link>

                <LoadingButton
                style={{width:'18rem',color:'white',background:'#F0BC5E',borderRadius:'10px',margin:'20px',height:'2.8rem'}}
                className='submit button'
        onClick={handleSubmitSignIn}
        endIcon={<ArrowForwardIosIcon/>}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Sign In
      </LoadingButton>
                {/* <button style={{width:'18rem'}} className="submit button" onClick={handleSubmitSignIn}>Sign In</button> */}
                <p style={{color:'black'}}>{Message}</p>
                <Googlelogin/>
                
              </div>
              {/*DC4E41*/}
            </div>
          </div>
          <div className="overlay-container">
            <div className="overlay2">
              <div className="overlay-panel overlay-left">
                <h1 className='h1'>You're Welcome</h1>
                <p className='p'>Login to Enter the Kolegia</p>
                <button style={{borderRadius:'50px'}} className="ghost button" id="signIn" onClick={handleClick2}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className='h1'>Hey, Buddy!</h1> 
    
                <p className='p'>Oops! don't have an account? Signup</p>
                 <button style={{borderRadius:'50px'}} className="ghost button" id="signUp" onClick={handleClick1}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
    
        
      </div>
     );
}
 
export default LoginSignUp;