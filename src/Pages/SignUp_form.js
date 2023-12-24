import { useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import "../Components/LoginSignUp/SignUpForm.css";
import { addUserDetails } from "../redux/actions/authActions";
import {  useNavigate,useLocation} from "react-router-dom"
import {resetErrorMessage} from '../redux/actions/authActions'
import Navbar from "../Components/Appbar/Navbar";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingButton from '@mui/lab/LoadingButton';

const SignUpForm = () => {
    const {addUserResponse,errorMessage} = useSelector((state) => state.auth);
    const location=useLocation();

    
  
    
    var signUpErrorMessage;

    
   
 
    const navigate=useNavigate();
    const [name,setName]=useState()
    const [email,setEmail]=useState('')
    const [roll_number,setRollNo]=useState('')
    const [hostel,setHostel]=useState('')
    const [room_number,setRoomNo]=useState('')
    const [phone,setPhone]=useState('')
    const [profile_Picture,setProfilePicture]=useState('')
    const [password,setPassword]=useState('')
    const [confirm_password,setConfirm_Password]=useState('')
    const [terms_accepted,setTerms_accepted]=useState(false)
    const [year,setYear]=useState('')
    const [batch,setBatch]=useState('')
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState('')

    useEffect(()=>{
         
    if(location.state !=null){
        if(location.state.Email){
            setEmail(location.state.Email)
        }
        if(location.state.name && location.state.profile_picture){
            setName(location.state.name)
           setProfilePicture(location.state.profile_picture)
        }
             
        }
   
        setLoading(false);
       },[location.state, signUpErrorMessage]);

    const dispatch=useDispatch();
    

    useEffect(()=>{
        if(addUserResponse.data){
            if(addUserResponse.data.user_token){
                
            localStorage.setItem("jwt",addUserResponse.data.user_token);
            navigate('/dashboard');
        }
    }
    if(errorMessage)setError(errorMessage)

    return ()=>{
        dispatch(resetErrorMessage)
    }
    },[addUserResponse.data, dispatch, errorMessage, navigate])
//signUp verified here
   



    const handleSubmit=()=>{
        setLoading(true);
        const formData= new FormData();
       
        formData.append('name',name)
        formData.append('email',email)
        formData.append('roll_number',roll_number)
        formData.append('hostel',hostel)
        formData.append('room_number',room_number)
        formData.append('phone',phone)
        formData.append('password',password)
        formData.append('confirm_password',confirm_password)
        formData.append('terms_accepted',terms_accepted)
        formData.append('batch',batch)
        formData.append('year',year)
        

        formData.append('profile_Picture',profile_Picture)

      
        dispatch(addUserDetails(formData));
      
      }



    return ( 
        <>
        <Navbar/>
        <div className="signUpContainer">
        <div  className="signUpFormCont">
            <h1 style={{width:'100%',color:'#332A7C',fontFamily:"Inconsolata, monospace",fontSize:'30px'}}>ENTER YOUR DETAILS</h1>
            <input style={{marginTop:'20px'}} defaultValue={name} onChange={e=>setName(e.target.value)} placeholder="Name"  type="text" />
            <input style={{marginTop:'20px'}} defaultValue={email} onChange={e=>setEmail(e.target.value)} placeholder=" Email" type="text" />
            <input onChange={e=>setPhone(e.target.value)} type="number" placeholder="Mobile No" />
            <input onChange={e=>setYear(e.target.value)} type="string" placeholder="Year(2019,2020..)" />
            <input onChange={e=>setBatch(e.target.value)} type="string" placeholder="Batch(IMG,IMT,BCS)"/>
            <input onChange={e=>setRollNo(e.target.value)} type="text" placeholder="Roll No(2020-IMGxxx)" />
            <input onChange={e=>setHostel(e.target.value)} type="text" placeholder="Hostel(BH-1)" />
            <input onChange={e=>setRoomNo(e.target.value)} type="text" placeholder="Room No" />
           
            <input onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
            <input onChange={e=>setConfirm_Password(e.target.value)} type="password" placeholder="Confirm Password" />
          
            <label style={{marginTop:'8px',fontFamily:"Inter, sans-serif",fontWeight:'700',color:'black'}} htmlFor="input">Terms and condition</label>
            <input style={{width:'4rem'
            ,height:'1rem'}} type="checkbox"
            onChange={(e)=>setTerms_accepted(e.target.checked)}
            defaultChecked={terms_accepted}
            />
            {/* <button style={{width:'24rem',height:'2.5rem',fontSize:'1.4rem',background:"#F25767",color:'white',border:'none',fontFamily:"Inter, monospace",fontWeight:'700',
            borderRadius:'6px'}} onClick={handleSubmit}>SUBMIT</button> */}
            <LoadingButton
                style={{width:'24rem',height:'2.5rem',fontSize:'1.4rem',background:"#F25767",color:'white',border:'none',fontFamily:"Inter, monospace",fontWeight:'700',borderRadius:'6px'}}
                className='submit button'
        onClick={handleSubmit}
        endIcon={<ArrowForwardIosIcon/>}
       
        
        variant="contained"
      >Submit
      </LoadingButton>
            <p style={{color:'black'}}>{error}</p>
        </div>
        </div>
        </>
     );
}
 
export default SignUpForm;