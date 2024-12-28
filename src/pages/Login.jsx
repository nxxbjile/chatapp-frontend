import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { GlobalContext } from '../contexts/Global';

const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { baseUrl, currUser, setCurrUser } = useContext(GlobalContext);

  const uRef = useRef();
  const pRef = useRef();

  const navigate = useNavigate();

  const handleInputChange = (setInput, e) => {
    setInput(e.target.value);
  }

  const validateInput = () => {
    if(pRef.current.value.length <= 2 || uRef.current.value.length <= 2){
      return false;
    }else{
      return true;
    }
  }
  const handleLogin = async () => {  // function to handle the login logic and redirect to the main page
    axios.defaults.withCredentials = true; 
    setIsLoading(true);
    try{
      var valid = validateInput();
      if(valid){
        var res = await axios.post(`${baseUrl}/user/login`,{
          username,
          password:pass,
        },{
          withCredentials:true,
        })
        
        if(res.data.success == false){
          setIsLoading(false);
        }
        console.log(res.data);
        setIsLoading(false);
  
        var user = {
          username:username,
          password:pass
        }
        setCurrUser(user);
        localStorage.setItem("user", JSON.stringify(user))
        if(res.data.success == true){
          navigate("/")
        }  
      }else{
        setIsLoading(false);
        return;
      }

    }catch(error){
      setIsLoading(false);
      console.log("error: ", error);
    }
  }

  const handleSignup = () => {
    navigate("/signup");
  }

  //username and password input check


  // useEffect(()=>{
  //   console.log("username : ", username);
  //   console.log("\n password : ", pass);
  // }, [username, pass])
  return (
    <>
      <div className={`w-screen h-screen overflow-hidden flex items-center justify-center bg-[#28282B]`}>
        <div className={`w-3/12 max-sm:w-5/6 h-4/5 rounded-2xl border border-neutral-400 flex flex-col p-3 justify-between items-center`}>
          <div className={`w-full h-fit flex flex-col gap-3 items-center justify-center py-3`}>
            <input ref={uRef} onChange={(e)=>handleInputChange(setUsername, e)} type="text" className="focus:outline-none placeholder:text-neutral-400 p-2 px-3 rounded-md w-3/4 bg-neutral-600 text-neutral-400" placeholder="username" value={username} required minLength={2} />
            <input ref={pRef} onChange={(e)=>handleInputChange(setPass, e)} type="password" className="focus:outline-none placeholder:text-neutral-400 p-2 px-3 rounded-md w-3/4 bg-neutral-600 text-neutral-400" placeholder="password" value={pass} required minLength={2} />
          </div>
          
          <div className={`py-3`}>
            <div onClick={handleLogin} className={`w-full my-3 cursor-pointer rounded-md bg-rose-500 text-white text-lg font-medium h-10 flex items-center justify-center hover:bg-rose-600 transition-all duration-300 ease-in-out`}>{isLoading ? <PulseLoader color="#ffffff" size={4} /> : 'Login'}</div>
            <div className={`flex gap-2 items-center justify-center text-neutral-400`}><hr className={`text-neutral-400 w-1/2`}/> or <hr className={`text-neutral-400 w-1/2`} /></div>
            <div className={`text-md text-neutral-400`}>New on ChatApp? <span onClick={handleSignup} className={`cursor-pointer hover:text-rose-400 trasition-all duration-300 ease-in-out underline text-sm text-rose-500`}>signup Now</span></div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login