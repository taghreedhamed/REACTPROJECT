

import axios from 'axios';
import Joi from 'joi';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login({logver}) {

const navigate = useNavigate();
const [joiErrors, setJoiErrors] = useState(null);
const [apiMessage, setApiMessage] =useState("");
const [clickedBtn , setClickedBtn] = useState(false);

const [user, setUser] = useState({
email:'',
password:'',
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
let inputValue = e.target.value;
let propertyName = e.target.id;
let newUser = {...user};
newUser[propertyName] = inputValue;

setUser(newUser);
}


function submitUser(e) {
e.preventDefault();
setClickedBtn(true);
const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().pattern(/^[a-z]{6,10}$/i).required()
});


let joiResponse =  schema.validate(user, {abortEarly: false});
// console.log(joiResponse.error);
// setJoiErrors(joiResponse.error.details)
if (joiResponse.error == undefined) {
     sendUser();
}
else {
let erroList = joiResponse.error.details;
setJoiErrors( erroList);
setClickedBtn(false);
}

}

async function sendUser() {

let {data} = await axios.post('https://route-movies-api.vercel.app/signin', user);
setClickedBtn(false);
console.log(data);

if (data.message == "success") {
  navigate('/home');
  localStorage.setItem('tkn' , data.token);
  logver();
}

else {
setApiMessage( data.message );
}

}
return <>
   <div className="w-50 m-auto py-5">
    {apiMessage.length ==0? "" : <div className='alert alert-danger'>{apiMessage}</div>}
    <form onSubmit={submitUser}>
    <h3 className='mb-4'>Login Form</h3>

    <label htmlFor="email">email</label>
    <input onChange={getUser} id='email' className='form-control my-3' type="email" placeholder='enter you email' />
    {getSpecificError('email')? <div className='alert alert-danger'>{getSpecificError('email')}</div>:''}


    <label htmlFor="password">password</label>
    <input onChange={getUser} id='password' className='form-control my-3' type="password" placeholder='enter you password' />
    {getSpecificError('password')? <div className='alert alert-danger'>Password Must be 6 to 10</div>:''}


    <button className='btn btn-outline-info mt-3'>
      {clickedBtn == false? "Login" : <i className='fa-solid fa-spinner fa-spin'></i>}
    </button>
    </form>
   </div>
</>
}
