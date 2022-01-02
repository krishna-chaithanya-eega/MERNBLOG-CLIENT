import './update.css';
import { useLocation } from 'react-router';
import { useState ,useContext ,useEffect} from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import axios from 'axios';




const initialValues = {
    title: '',
    desc: '',
    photo: '',
    username: '',
    categories: '',
}

export default function Update() {

    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const [post,setPost]=useState(initialValues);
    useEffect(() => {

        const getPost = async () => {
            const res = await axios.get(`/posts/${path}`)
            setPost(res.data)
        }

        getPost()
    }, [path])

    const {user} = useContext(Context);

    const handleChange=(e)=>{
        setPost({...post , [e.target.name]:e.target.value})
    }

    let img
    const PF = "http://localhost:8000/images/";
    if (post.photo) {
        img = PF + post.photo

    } else {
        img = 'https://www.techimage.com/wp-content/uploads/2017/05/iStock-506610728.jpg';
    }


    const handleSubmit =async (e)=>{
        e.preventDefault();
     
     try{
           const res= await axios.put(`/posts/${post._id}`,{username:user.username,title:post.title,desc : post.desc});
           window.location.replace(`/post/${post._id}`)
        }catch(err){}
        
    }


    return (
        <div className='update'>

            <img 
            className='updateImg'
            src= {img}
            alt="" 
            />

            <form className='updateForm' onSubmit={handleSubmit} >
                <div className='updateFormGroup'>
                    <label htmlFor='fileInput'>
                        <i className="updateIcon fas fa-plus-circle"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} />
                    <input type="text" value={post.title} placeholder='Title' name='title' className='updateInput' autoFocus='true' onChange={(e)=>handleChange(e)}/>
                </div>
                <div className='updateFormGroup'>
                    <textarea placeholder='Tell your story.......' value={post.desc} type="text" name='desc' className='updateInput updateText' onChange={(e)=>handleChange(e)}/>
                </div>
                <button className='updateSubmit' type="submit" >UPDATE</button>
                
            </form>
        </div>
    )
}
