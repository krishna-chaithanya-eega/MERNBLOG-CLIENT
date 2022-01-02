import './settings.css';
import axios from 'axios';
import { useContext, useState } from 'react';
import Sidebar from '../../components/sidebar/SideBar';
import { Context } from '../../context/Context';

export default function Settings() {

    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const {user} = useContext(Context);

    const handleSubmit=async(e)=>{
        e.preventDefault();

        axios.put(`/users/${user._id}`,{userId: user._id,username,email,password})

    }
    return (
        <div className='settings'>

            <div className='settingsWrapper'>
                <div className='settingsTitle'>
                    <span className='settingsUpdateTitle'>Update Your Profile</span>
                    <span className='settingsDeleteTitle'>DeleteProfile</span>
                </div>
                <form className='settingsForm' onSubmit={handleSubmit} >
                    <label>Profile Picture</label>
                    <div className='settingsPP'>
                        <img
                            src='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
                            alt=""
                            width='100%'

                        />
                        <label htmlFor='fileInput' >
                            <i className="settingsPPIcon far fa-user-circle"></i>

                        </label>
                        <input type="file" id='fileInput' style={{ display: 'none' }} ></input>

                    </div>

                    <label>Username</label>
                    <input type="text" placeholder={user.username}  name="name" onChange={(e)=>(setUsername(e.target.value))}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} name="email"  onChange={(e)=>(setEmail(e.target.placeholder))} />
                    <label>Password</label>
                    <input type="password" placeholder={user.password} name="password"  onChange={(e)=>(setPassword(e.target.value))}/>
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>


                </form>
            </div>
            <Sidebar />

        </div>

    )
}
