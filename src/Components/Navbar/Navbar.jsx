

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navbar from "./navbar.module.css"

export default function Navbar({ currentUser , remove}) {

  const navigate = useNavigate();

  function logOut() {
    console.log("logOut");
    let userChoice = window.confirm("Are You Sure To Login");
    if (userChoice) {
      remove();
      navigate("/login");
    }
  }



  return <>
<nav className="navbar navbar-expand-lg">
  <div  className="container-fluid">
    <Link className="navbar-brand text-white" to="/home">NOXE</Link>
    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon  border-0 bg-white"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">


      {currentUser? <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/tv">Tv</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/person">Person</Link>
        </li>
        </ul> : ''}
        

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
        <li className="nav-item d-flex">
        <li className={navbar.item1}>
        <i className='fa-brands fa-facebook me-3'></i>
        </li>
        <li className={navbar.item1}>
        <i className="fa-brands fa-instagram me-3"></i>
        </li>
        <li className={navbar.item1}>
        <i className="fa-brands fa-twitter me-3"></i>
        </li>
        <li className={navbar.item1}>
        <i className="fa-brands fa-spotify me-3"></i>
        </li>
        </li>

       {currentUser?<li className="nav-item">
        <span className="nav-link text-white" onClick={logOut}>Logout</span>
        </li> : <>
        <li className="nav-item">
        <Link className="nav-link text-white" to="/login">Login</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link  text-white" to="/register">Register</Link>
        </li>
        </>}
        </ul>
    </div>
  </div>
</nav>
</>
}
