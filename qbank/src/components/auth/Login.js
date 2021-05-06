import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {login} from '../../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const Login = ({login,isAuthenticated}) => {
  const [formData, SetformData] = useState({ 
      email:'',
      password: '',
  });

  const {email,password}= formData;

  const onChange = e => SetformData({...formData,[e.target.name]:e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
      login(email,password);
  };

  //Redirect if Login successfully
  if(isAuthenticated){
    return <Redirect to='/'/>
  }
  
  return (
      <>
      <div  className="col-lg-4 col-md-4 mx-auto" >
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead">
              <i className="fas fa-user"/> Sign Into  Your Account
          </p>
      <form className="form" onSubmit={e=> onSubmit(e)}>

       <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
          <input className="form-control" type="email" name="email"   placeholder="Enter Email" value={email} onChange={e => onChange(e)} required/>
        </div>

        <div className="form-group">
        <label htmlFor="exampleInputEmail1">Password</label>
          <input type="password"  className="form-control"  placeholder="Password" name="password" 
           value={password} onChange={e => onChange(e)} minLength="6"/>
        </div>
       
        <input type="submit" className="btn btn-primary" value="Login"/>
         
      </form> 
      <p className="my-1">
        Dont have an account <Link to='/register'>Register</Link>
      </p>
    </div>
      </>
  )
}

Login.propTypes = {
  login:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{login})(Login)