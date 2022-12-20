

import axios from 'axios';
import Joi from 'joi';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

const  navigate = useNavigate();
  
const [joiErrors, setJoiErrors] = useState(null);
const [apiMessage, setApiMessage] = useState("");
const [clickedBtn , setClickedBtn] = useState(false);

const [user, setUser] = useState({
  first_name: "",
  last_name: "",
  email: "",
  age:0,
  password:"",
});


function getSpecificError(key) {


    if (joiErrors != null) {
      
    for (let i = 0; i< joiErrors.length; i++) {
      

      if (joiErrors[i].context.key == key) {
        return joiErrors[i].message
      }
      
    }

    return '' ;

    }

}

function getUser(e) {
  setJoiErrors(null);
  setApiMessage("");
  let inputValue = e.target.value;
  let propertyName = e.target.id;
  let newUser={...user};
  newUser[propertyName] = inputValue;
  // console.log(newUser);
  setUser(newUser);
}

function submitUser(e) {
  e.preventDefault();
  setClickedBtn(true);
  let schema = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(10).required(),
    last_name: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','net']}}).required(),
    age: Joi.number().min(18).max(60).required(),
    password: Joi.string().pattern(/^[a-z]{6,10}$/i).required(),
  });

  let joiResponse = schema.validate(user, {abortEarly:false});
  console.log(joiResponse);
  if (joiResponse.error==undefined) {
  console.log("hello");
  sendUser();
}
else{
  let errorList = joiResponse.error.details;
  // console.log(errorList);
  setJoiErrors(errorList);
  setClickedBtn(false);
}
}

async function sendUser() {
  
let {data} = await axios.post('https://route-movies-api.vercel.app/signup' , user);
setClickedBtn(false);
console.log(data);

if (data.message=="success") {
  navigate("/home");
}
else{
  setApiMessage(data.message);
}

};

  return <>
     <div className="w-50 m-auto py-5">
     {apiMessage.length == 0? "" : <div className='alert alert-danger'>{apiMessage}</div>}
      <form onSubmit={submitUser}>
      <h3 className='mb-4'>Registeration Form</h3>


      <label htmlFor="first_name">first_name</label>
      <input onChange={getUser}  id='first_name' className='form-control my-3' type="text" placeholder='enter you first name' />
       {getSpecificError('first_name')? <div className='alert alert-danger'>{getSpecificError('first_name')}</div>:''}


      <label htmlFor="last_name">last_name</label>
      <input onChange={getUser} id='last_name' className='form-control my-3' type="text" placeholder='enter you last name' />
      {getSpecificError('last_name')? <div className='alert alert-danger'>{getSpecificError('last_name')}</div>:''}



      <label htmlFor="email">email</label>
      <input onChange={getUser} id='email' className='form-control my-3' type="email" placeholder='enter you email' />
      {getSpecificError('email')? <div className='alert alert-danger'>{getSpecificError('email')}</div>:''}


      <label htmlFor="age">age</label>
      <input onChange={getUser} id='age' className='form-control my-3' type="number" placeholder='enter you age' />
      {getSpecificError('age')? <div className='alert alert-danger'>{getSpecificError('age')}</div>:''}


      <label htmlFor="password">password</label>
      <input onChange={getUser} id='password' className='form-control my-3' type="password" placeholder='enter you password' />
      {getSpecificError('password')?  <div className='alert alert-danger'>Password Must be 6 to 10</div>:''}


      <button className='btn btn-outline-info mt-3'>
        {clickedBtn == false? 'Register' : <i className='fa-solid fa-spinner fa-spin'></i> }
      </button>
      </form>
     </div>
  </>
}
