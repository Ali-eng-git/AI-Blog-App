import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContent'

import AUTH_IMG from '../../assets/logo.jpg'
import Input from '../Inputs/Input'
import { validateEmail } from '../../utils/helper'


const Login = ({setCurrentPage}) => {
  const [email,setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(null);

  const {updateUser, setOpenAuthForm} = useContext(UserContext) 
  const navigate=useNavigate();

  //Handle Login form submission
  const handleLogin =async (e) => {
    e.preventDefault();
 
    if (!validateEmail(email)) {
      setError("Please enter a valid email")
      return;
    }

    if (!password) {
      setError("Please enter the password")
      return;
    }

    setError("");

    //Login API Call

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });

      const {token, role} = response.data;

      if (token) {
        localStorage.setItem("token",token);
        updateUser(response.data);

        if (role === "admin") {
          setOpenAuthForm(false)
          navigate('/admin/dashboard')
        }
        setOpenAuthForm(false)
      }
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      }else{
        setError("Something went wrong. Please try again later")
      }
    }
    
  }
  return (
    <div className='flex items-center'>
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Welcome</h3>
        <p className="text-xs text-slate-700 mt-[2px] mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin}>

          <Input
           onChange={({target})=> setEmail(target.value)}
           value={email}
           label={"Email Address"}
           placeholder="john@email.com"
           type="text"
          />

          <Input
           onChange={({target})=> setPassword(target.value)}
           value={password}
           label={"Password"}
           placeholder="min 8 characters"
           type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button  className="btn-primary" type='submit'>LOGIN</button>
         
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <button 
           className="font-medium text-primary underline cursor-pointer"
            onClick={()=>{
              setCurrentPage("signup")
            }}
            >
              SignUp
            </button>
          </p>
        </form>
      </div>

            <div className="hidden md:block">
              <img src={AUTH_IMG} alt="" className="h-[400px]" />
            </div>
      
    </div>
  )
}

export default Login
