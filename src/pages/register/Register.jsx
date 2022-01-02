import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './register.css';

export default function Register() {

    const [username,setUsername] =useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(false);

    const handleSubmit = async  (e)=>{
        e.preventDefault();
        setError(false)
      try{
        const res=await axios.post("/auth/register",{
            username,
            email,
            password
        });
      
        res.data && window.location.replace("/login")

      }catch(err){
        setError(err)
      }
        
    }

    return (
        <div className='register'>
        <span className='registerTitle'>Register</span>
            <form className='registerForm' onSubmit={handleSubmit}>

                <label> USERNAME</label>
                <input 
                type="text" 
                className='registerInput' 
                placeholder='username' 
                onChange={e=>setUsername(e.target.value)}
                />
                
                <label> EMAIL</label>

                <input 
                type="text" 
                className='registerInput' 
                placeholder='email' 
                onChange={e=>setEmail(e.target.value)}
                />

                <label> Passowrd</label>

                <input 
                type="password" 
                className='registerInput'  
                placeholder='password' 
                onChange={e=>setPassword(e.target.value)}
                />

                <button className='registerButton' type="submit" >Register</button>
            </form>


            <button className='registerLoginButton'><Link className='link' to={'/login'}>LOGIN</Link></button>
            {error && <span style={{marginTop:'10px',color:'red'}}>Something went Wrong!!!</span>}
        </div>
    )
}
