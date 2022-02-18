import {useState,useEffect} from 'react';
import { useDispatch ,useSelector} from "react-redux";
import {verifyOtp} from '../redux/actions/authActions'
import { useLocation, useNavigate } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import {resetErrorMessage} from '../redux/actions/authActions'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OtpPage = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const location=useLocation();
    const responseStatusCode= useSelector((state) => state.auth.otpStatusCode);
    const errorMessage=useSelector((state)=>state.auth.errorMessage)
    const [loading, setLoading] = useState(false);
    const [otp,setOtp]=useState(0);
    const otpId= useSelector((state) => state.auth.otpId);
    // const otpId="61ee9495db63b894d08f6c56";


    var Email;
    var message;
    var Verification;
    if(location.state !=null){
         Email=location.state.Email;
         Verification=location.state.verification;
    }
    ///otp-verification

    
    if(responseStatusCode===200){
        dispatch(resetErrorMessage)
        if(Verification==='EMAIL_VERIFICATION'){
        navigate('/signUpForm',{
            state:{Email:Email}
          });
      }
     else if(Verification==='FORGOT_PASSWORD'){
        navigate('/resetPassword',{
            state:{Email:Email}
          });
        }
    }else  {
        message=errorMessage
      }


      useEffect(()=>{
        setLoading(false);
       },[message]);
       
    const style={

box:{
    position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width:'400px',
        display:"flex",
        flexDirection:'column',
        alignItems:"center",
        gap:"2rem",
        padding:'10px',
        borderRadius:'8px',
background: '#F0BC5E',
boxshadow:  '5px 5px 10px #b5b5b5,-5px -5px 10px #ffffff',
             
},
cont:{
    backgroundColor:'#332A7C',
    width:'100vw',
    height:'100vh'
}
}
     const handleClick =()=>{
         setLoading(true)
     dispatch(verifyOtp(otp,otpId,Verification));
    }


    return ( 
        <div style={style.cont} className="otp-container">
            <div style={style.box} className="otp-box">
            <p style={{fontSize:'1.3rem'}}>
                An otp has been sent to your email address to verify you account .Please Enter that Otp below:
            </p>
            <input onChange={(e)=>setOtp(e.target.value)} style={{width:'12rem',height:'2rem'}} type="number" placeholder="otp"/>
           
            <LoadingButton
                style={{width:'13rem',color:'white',background:'#332A7C',borderRadius:'10px',margin:'20px',height:'2.8rem'}}
                className='submit button'
        onClick={handleClick}
        endIcon={<ArrowForwardIosIcon/>}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
  Verify Otp
      </LoadingButton>
            <p style={{color:'black'}}>{message}</p>
            </div>
           
        </div>
     );
}
 
export default OtpPage;