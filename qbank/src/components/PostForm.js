import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

import {connect}  from 'react-redux';
import {addPost} from '../actions/post'

const PostForm = ({addPost,isAuthenticated})=> {

    const [text,setText] =  useState('');
    
   
     
    
    return(
        <div className="card">
        <div className="card-body">
          <p style={{ color: " chocolate", fontWeight: "bold" }}>
            Have a burning question? Ask the community
          </p>

            <form className="form" onSubmit={e => {
                if(isAuthenticated){
                  e.preventDefault();
                  addPost({text});
                  setText('');
                 
                }
                else{
                  alert('please login..');
                 
                    return
                      (<Redirect to='/'/>)
                  
                }
               
            }}>
              <div className="form-group ">
                <div className="input-group ">
                  <textarea className="form-control" type="text"name="post" placeholder="Type your question here.."
                  value={text} onChange={e => setText(e.target.value)} required></textarea>
                  
                </div>
                <input type="submit" className="btn btn-dark btn-sm float-end" value="Post a Question"/>
              </div>

              
            </form>
         
        </div>
      </div>
    )

    }
   


PostForm.propType={
addPost: PropTypes.func.isRequired,
isAuthenticated: PropTypes.bool,
}

export default connect(null,{addPost})( PostForm)