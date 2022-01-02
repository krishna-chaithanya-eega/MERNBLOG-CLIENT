import './post.css';
import { Link } from 'react-router-dom';

export default function Post({post}) {
    let img
    const PF="http://localhost:8000/images/";
    if(post.photo){
        img= PF +post.photo
      
    }else{
        img='https://www.techimage.com/wp-content/uploads/2017/05/iStock-506610728.jpg' ;
    }
     
    return (
        <Link to={`/post/${post._id}`} className="link">
            <div className='post'>
          
            <img
                className='postImg'
                src={img}
                alt=""
            />

            <div className='postInfo'>
                <div className='postCats'>
                    {
                        post.categories.map(c=>(
                            <span className='postCat'>{c.name}</span>
                        ))
                    }
                </div>
                <span className='postTitle'> {post.title}</span>
               
                <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>


            </div>


            <p className='postDesc'>
              {post.desc}
            </p>


        </div>
        </Link>
    )
}
