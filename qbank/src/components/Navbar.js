import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/auth';
// import DarkModeToggle from "react-dark-mode-toggle";

const Navbar = ({ auth:{isAuthenticated, loading},logout}) => {
  // const [isDarkMode, setIsDarkMode] = useState(() => false);

  const authLinks = (

    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink onClick={logout} className="nav-link " to="/">
                  <button className="btn btn-sm" style={{color:'white', backgroundColor: " chocolate", fontWeight: "bold" }}>
                    Logout
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Admin</NavLink>
              </li>
              <li className="nav-item">
              </li>
    </ul>
  );
   
  const guestLinks = (

    <ul className="navbar-nav mb-2 mb-lg-0 ml-auto">

    <li className="nav-item">
      <NavLink className="nav-link" to="/register"><button className="btn btn-sm" style={{color:'white', backgroundColor: " chocolate", fontWeight: "bold" }}>Register</button></NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link  "  to="/login"><button className="btn btn-sm" style={{color:'white', backgroundColor: " chocolate", fontWeight: "bold" }}>Login</button></NavLink>
    </li>
    <li className="nav-item">
    {/* <NavLink className="nav-link  "  to="/posts"><button className="btn btn-sm" style={{color:'white', backgroundColor: " chocolate", fontWeight: "bold" }}>Posts</button></NavLink> */}
    </li>

  
  </ul>
  );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        
        <div className="container-fluid">
          <NavLink className="navbar-brand " to="/">Q-Bank</NavLink> 

          <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search question here" aria-label="Search"/>
              
            </form>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">

            {!loading && (<>{isAuthenticated ? authLinks: guestLinks }</>)}
           
          </div>
        </div>
        {/* <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={80}/> */}
      </nav>
         
    )
};

Navbar.propTypes = {
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
  auth: state.auth
});
export default connect(mapStateToProps, {logout})(Navbar);
