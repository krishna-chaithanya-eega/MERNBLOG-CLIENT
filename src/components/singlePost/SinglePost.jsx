import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { Context } from '../../context/Context';

import './singlePost.css';



export default function SinglePost() {

    const { user } = useContext(Context)



    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    useEffect(() => {

        const getPost = async () => {
            const res = await axios.get(`/posts/${path}`)
            setPost(res.data)
        }

        getPost()
    }, [path])

    const handleSubmit=async()=>{
        try{
            await axios.delete(`/posts/${path}`,{
                data:{username:user.username}
            })

        window.location.replace("/")

        }catch(err){}
    }

    let img
    const PF = "http://localhost:8000/images/";
    if (post.photo) {
        img = PF + post.photo

    } else {
        img = 'https://www.techimage.com/wp-content/uploads/2017/05/iStock-506610728.jpg';
    }




    // const img = post.photo || "https://www.techimage.com/wp-content/uploads/2017/05/iStock-506610728.jpg"
    return (
        <div className='singlePost'>

            <div className='singlePostWrapper'>
                <img
                    src={img}
                    alt=""
                    className='singlePostImg'
                />

                <h1 className='singlePostTitle'>

                    {post.title}
                    {
                        post.username === user?.username && (
                            <div className='singlePostEdit'>
                            <Link className='link' to={`/update/${post._id  }`}> <i className="singlePostIcon far fa-edit"></i></Link>
                               
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleSubmit} ></i>
                            </div>
                        )
                    }

                </h1>

                <div className='singlePostInfo'>

                    <span className='singlePostAuthor'>Author :
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b>{post.username} </b>
                        </Link>
                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>

                </div>

                <p className='singlePostDesc'>
                    {post.desc}
                </p>


            </div>

        </div>
    )
}
