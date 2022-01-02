import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext,useState } from 'react';

import { Context } from '../../context/Context';


export default function Login() {

    const [username,setUsername] =useState("");
    const [password,setPassword]=useState("");

    

    const { user, dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });        
        try {
            const res=await axios.post("/auth/login",{
                username,
                password
            });
            
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
        
            dispatch({ type: "LOGIN_FAILURE" });
        }
    }

  

    return (
        <div className='login'>
            <span className='loginTitle'>Login</span>
            <form className='loginForm' onSubmit={handleSubmit} >

                <label> Username</label>
                <input
                    type="text"
                    className='loginInput'
                    placeholder='enter username...'
                    onChange={e=>setUsername(e.target.value)}
                    
                />
                <label> Passowrd</label>
                <input
                    type="password"
                    className='loginInput'
                    placeholder='enter password...'
                    onChange={e=>setPassword(e.target.value)}

                />

                <button className='loginButton' type="submit" disabled={isFetching}>Login</button>
            </form>


            <button className='loginRegisterButton' ><Link className='link' to={'/register'}>REGISTER</Link></button>
        
        </div>
    )
}
