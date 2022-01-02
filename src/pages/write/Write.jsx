import './write.css';
import { useState ,useContext} from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Write() {

    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [file,setFile]=useState(null);

    const {user} = useContext(Context);

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const newPost={
            username:user.username,
            title:title,
            desc:desc
        };
        if(file){
            const data = new FormData();
            const filename=Date.now()+file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo=filename;
            try{
                await axios.post("/upload",data)
            }catch{}
        }
        try{
           const res= await axios.post("/posts",newPost);
           window.location.replace("/post/"+res.data._id)
        }catch(err){}
        
    }

    let img 
    if (file){

         img= URL.createObjectURL(file)
    }
   else{
       img ="https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" 
   }
    return (
        <div className='write'>

            <img 
            className='writeImg'
            src= {img}
            alt="" 
            />

            <form className='writeForm' onSubmit={handleSubmit} >
                <div className='writeFormGroup'>
                    <label htmlFor='fileInput'>
                        <i className="writeIcon fas fa-plus-circle"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                    <input type="text" placeholder='Title' className='writeInput' autoFocus='true' onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className='writeFormGroup'>
                    <textarea placeholder='Tell your story.......' type="text" className='writeInput writeText' onChange={(e)=>setDesc(e.target.value)}/>
                </div>
                <button className='writeSubmit' type="submit" >PUBLISH</button>
            </form>
        </div>
    )
}
