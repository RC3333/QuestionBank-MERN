import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import PostForm from "./PostForm";
// import ReactPaginate from 'react-paginate';


export const Home = () => {
  
 

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    loadPosts();
  },[])

  const loadPosts = async () => {
    const result = await axios.get('/api/posts');
    setPosts(result.data);
  };
  


  return (
    <>
   
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-3 d-none d-md-block">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <dl>
                <dt ><Link style={{ color: " chocolate" }} to="/">History</Link></dt>
                <dd className="small">View the questions you viewed before</dd>
              </dl>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <dl>
              <dt ><Link style={{ color: " chocolate" }} to="/register">SignUp</Link></dt>
                <dd className="small">Signup to post,answer and much more</dd>
              </dl>
            </li>
          </ul>
        </div>

        <div className="col-lg-9 col-md-9 col-sm-9">
            <PostForm/>
          <hr/>
        <div className="posts">
        { posts.map((post) => (
          
            <div className="card mb-3" key={post._id}>
               <div className=" card-header ">
                    <div className="row">
                      <div className="col-6">
                          <img style={{ height:"20px", width:"20px" }} className="img-fluid" src={post.avatar} alt="..."/>
                          <small className="text-muted col-6">{post.name}</small>
                      </div>
                      <div className="col-6">
                          <p className="card-text  text-muted  "><small >Posted on <Moment format="DD/MM/YYYY">{post.date}</Moment> </small> </p>
                      </div>
                    </div>
                     
                  </div>
              <div className="row g-0" >
                    <div className="card-body">
                      <p className="card-text">{post.text}</p>
                    </div>
 
                  <div className=" card-footer"> 
                  <div className="row">
                    <div className="col-6">
                    <span><Link className='btn btn-sm btn-primary' to='/'>Like</Link> { post.likes.length > 0 && <span>{post.likes.length}</span>} </span> {" "}

                    </div>
                    <div className="col-6">
                    <span><Link className='btn btn-sm btn-primary'to='/'>Answer this question</Link> { post.comments.length > 0 && <span>{post.comments.length}</span>} </span>
                      
                    </div>
                  </div>   
                  </div>
              </div>
            </div>
          
          
        ))
        
        }
        </div>
        </div>
      </div>
    </div>
    </>
  );
};
