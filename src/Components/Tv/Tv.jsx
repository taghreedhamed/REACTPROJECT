

import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import tv from './tv.module.css';
import { Link } from 'react-router-dom';

export default function Home() {
const [ allTv , setAllTv] = useState(null);


async function getTrendingTv() {

  let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=cdcde4803724b426cdec2081ce359e11')
  let allTv = data.results;
  setAllTv(allTv);
}
useEffect(function () {

  getTrendingTv();

} , [])

  return <div  className={tv.all}>
 {allTv != null ?<div className="container mt-5">
  <div className="row align-items-center">
    <div className="col-md-4">
        <div className={tv.title}>
          <h2 className='align-items-center'>Trending Tv To Watch</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>
      {allTv.map((tv , index)=> <div key={index} className="col-md-4">
      <Link to={`/movieDateils/tv/${tv.id}`}>
      <div className="tv text-center bg-info position-relative">
      <img src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} alt="movie" className='w-100' />
      <div className="overly position-absolute top-0 start-0 end-0 bottom-0 
      d-flex justify-content-center align-items-center text-info">Click Here Show Details</div>
      <h3>{tv.name}</h3>
      </div>
      </Link>
      </div>)}
  </div>
  </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
  <i class="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
  </div>}
  </div>
}