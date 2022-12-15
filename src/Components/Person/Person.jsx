



import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import person from './person.module.css';
import PersonDateils from './../PersonDateils/PersonDateils';

export default function Person() {
    const [ allMovies , setAllMovies] = useState(null);

        
    async function getTrendingPerson(){

    let {data} = await axios.get('https://api.themoviedb.org/3/trending/person/week?api_key=cdcde4803724b426cdec2081ce359e11')
    let allMovies = data.results;
    setAllMovies(allMovies);
    }

    
  useEffect(function () {

    getTrendingPerson();  
  } , [])

 
  return <div className={person.all}>
  {allMovies != null?<div className="container mt-5">
   <div className="row align-items-center">
       <div className="col-md-4">
         <div className={person.title}>
           <h2 className='align-items-center'>Trending Person To Watch</h2>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
         </div>
       </div>
       {allMovies.map((person , index)=> <div key={index} className="col-md-4">
         <Link to={`/PersonDateils/${person.id}`}>
         <div className="text-center bg-danger position-relative">
          {person.profile_path?<img src={"https://image.tmdb.org/t/p/w500" + person.profile_path} alt="person" className='w-100' /> : <img src='caX3KtMU42EP3VLRFFBwqIIrch5.jpg' alt='' className='w-100' />}
         <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center text-danger
         align-items-center'>Click Here Show Details</div>
          <h3>{person.name}</h3>
         </div>
         </Link>
       </div>)}
   </div>
   </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
   <i class="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
   </div>}
   </div>
}