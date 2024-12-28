import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/Global';
import { PulseLoader } from 'react-spinners';

const Signup = () => {
  const [isLoading, setIsLoading ] = useState(false);
  const [user, setUser] = useState({
    username:"",
    password:"",
    name:"",
    email:"",
  });

  const { baseUrl } = useContext(GlobalContext);

  const navigate = useNavigate();

  const uRef = useRef();
  const pRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const handleInputChange = (field, e) => {
    setUser({...user, [field]:e.target.value});
  }

  const validateInput = () => {
    if(
      uRef.current.value.length <= 2 ||
      pRef.current.value.length <= 2 ||
      nameRef.current.value.length <= 2 ||
      emailRef.current.value.length <= 2   ){
        return false;
      }else{
        return true;
      }
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = async () => {
    setIsLoading(true);
    var isValid = validateInput();

    if(isValid){
      try{
        
        const res = await axios.post(`${baseUrl}/user/signup`, user,{
          withCredentials:true,
        });
        
        console.log(res.data);
        setIsLoading(false);
        
        if(res.data.success == true){
          navigate("/login");
        }

      }catch(error){

        setIsLoading(false);
        console.log("error :", error);

      }
    }else{

      setIsLoading(false);
      return;

    }
  }

  useEffect(()=>{
    console.log(user);
  },[user])

  return (
    <>
      <div className={`w-screen h-screen overflow-hidden flex items-center justify-center bg-[#28282B]`}>
        <div className={`w-3/12 h-4/5 rounded-2xl border border-neutral-400 flex flex-col p-3 justify-between items-center`}>
          <div className={`w-full h-fit flex flex-col gap-3 items-center justify-center py-3`}>

            <input ref={nameRef} onChange={(e)=>handleInputChange("name", e)} type="text" className="focus:outline-none placeholder:text-neutral-400 p-2 px-3 rounded-md w-3/4 bg-neutral-600 text-neutral-400" placeholder="name" value={user.name} />

            <input ref={uRef} onChange={(e)=>handleInputChange("username", e)} type="text" className="focus:outline-none placeholder:text-neutral-400 p-2 px-3 rounded-md w-3/4 bg-neutral-600 text-neutral-400" placeholder="username" value={user.username} />

            <input ref={emailRef} onChange={(e)=>handleInputChange("email", e)} type="text" className="focus:outline-none placeholder:text-neutral-400 p-2 px-3 rounded-md w-3/4 bg-neutral-600 text-neutral-400" placeholder="email" value={user.email} />

            <input ref={pRef} onChange={(e)=>handleInputChange("password", e)} type="password" className="focus:outline-none placeholder:text-neutral-400 p-2 px-3 rounded-md w-3/4 bg-neutral-600 text-neutral-400" placeholder="password" value={user.pass} />

          </div>
          
          <div className={`py-3`}>
            <div onClick={handleSignup} className={`w-full my-3 cursor-pointer rounded-md bg-rose-500 text-white text-lg font-medium h-10 flex items-center justify-center hover:bg-rose-600 transition-all duration-300 ease-in-out`}>{isLoading ? <PulseLoader color="#ffffff" size={4} /> : 'Sign up'}</div>
            <div className={`flex gap-2 items-center justify-center text-neutral-400`}><hr className={`text-neutral-400 w-1/2`}/> or <hr className={`text-neutral-400 w-1/2`} /></div>
            <div className={`text-md text-neutral-400`}>Already on ChatApp? <span onClick={handleLogin} className={`cursor-pointer hover:text-rose-400 trasition-all duration-300 ease-in-out underline text-sm text-rose-500`}>login</span></div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Signup