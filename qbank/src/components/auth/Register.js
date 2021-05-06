import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types'
import {register} from '../../actions/auth';

 const Register = ({setAlert,register,isAuthenticated}) => {
    const [formData, SetformData] = useState({
        name:'',
        email:'',
        password: '',
        password2:'',
    });

    const {name,email,password,password2}= formData;

    const onChange = e => SetformData({...formData,[e.target.name]:e.target.value});

    const onSubmit = async e => {
      e.preventDefault();
      if(password !== password2){
          setAlert('password do not matched..!', 'danger');
      } else {  
        register({name,email,password});
        // window.location = '/'  
      }
    };
      //Redirect if register successfully
    if(isAuthenticated){
      return <Redirect to='/'/>
    }
    
    return (
        <>
        <div  className="col-lg-4 col-md-4 mx-auto" >
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"/> Create Your Account
            </p>
        <form className="form" onSubmit={e=> onSubmit(e)}>

          <div className="form-group">
          <label htmlFor="exampleInputEmail1">User Name</label>
            <input className="form-control" type="text" name="name" value={name} onChange={e => onChange(e)} placeholder="Enter Username" />

          </div>

          <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
            <input className="form-control" type="email" name="email"   placeholder="Enter Email" value={email} onChange={e => onChange(e)} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else. </small>
          </div>

          <div className="form-group">
          <label htmlFor="exampleInputEmail1">Password</label>
            <input type="password"  className="form-control"  placeholder="Password" name="password" 
             value={password} onChange={e => onChange(e)} />
          </div>

          <div className="form-group">
          <label htmlFor="exampleInputEmail1">Confirm Password</label>
            <input type="password"  className="form-control"  placeholder="Confirm Password" name="password2" 
             value={password2} onChange={e => onChange(e)}  />
          </div>
         
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <p className="my-1">
        Already have an account <Link to='/login'>SignIn</Link>
      </p>
      </div>
        </>
    )
}

Register.propTypes = {
  setAlert : PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}
const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {setAlert,register})(Register);