

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movie from './movie.module.css';

export default function Movies() {
    const [ allMovies , setAllMovies] = useState(null);

        
    async function getTrendingMovies() {

    let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=cdcde4803724b426cdec2081ce359e11')
    let allMovies = data.results;
    setAllMovies(allMovies);
    }

    
  useEffect(function () {

    getTrendingMovies();  
  } , [])

  
  return <div className={movie.all}>
  {allMovies != null?<div className="container mt-5">
   <div className="row align-items-center">
       <div className="col-md-4">
         <div className={movie.title}>
           <h2 className='align-items-center'>Trending Movies To Watch</h2>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
         </div>
       </div>
       {allMovies.map((movie , index)=> <div key={index} className="col-md-4">
         <Link to={`/movieDateils/movie/${movie.id}`}>
         <div className="movie text-center bg-secondary position-relative">
           <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="movie" className='w-100' />
           <div className="overly position-absolute top-0 start-0 end-0 bottom-0 
           d-flex justify-content-center align-items-center text-secondary">Click Here Show Details</div>
           <h3>{movie.title}</h3>
         </div>
         </Link>
       </div>)}
   </div>
   </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
   <i class="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
   </div>}
   </div>
}
