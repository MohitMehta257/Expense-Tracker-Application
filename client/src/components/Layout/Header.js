import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {message} from 'antd';

function Header() {
    const[loginUser,setLoginUser]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'))
        if(user){
            setLoginUser(user); 
        }
    });

    const logoutHandler=()=>{
        localStorage.removeItem("user");
        message.success("Log Out Successful");
        navigate('/login');
    }
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link class="navbar-brand" to='/'>Expense Management</Link>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <p>{loginUser && loginUser.name}</p> 
        </li>

        <li class="nav-item">
          <button className='btn btn-primary' onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
    </>
  );
};  

export default Header;