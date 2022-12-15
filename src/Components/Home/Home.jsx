

import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import home from './home.module.css';
import { Link } from 'react-router-dom';

export default function Home() {
const [ allMovies , setAllMovies] = useState(null);
const [ allTv , setAllTv] = useState(null);
async function getTrendingMovies() {

  let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=cdcde4803724b426cdec2081ce359e11')
  let allMovies = data.results;
  setAllMovies(allMovies);
}

async function getTrendingTv() {

  let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=cdcde4803724b426cdec2081ce359e11')
  let allTv = data.results;
  setAllTv(allTv);
}
useEffect(function () {

  getTrendingMovies();
  getTrendingTv();

} , [])

  return <div className={home.all}>
 {allMovies != null  && allTv != null ?<div className="container mt-5">
  <div className="row align-items-center">
      <div className="col-md-4">
        <div className={home.title}>
          <h2 className='align-items-center'>Trending Movies To Watch</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>
      {allMovies.map((movie , index)=> <div key={index} className="col-md-4">
        <Link to={`/movieDateils/movie/${movie.id}`}>
        <div className={home.tv}>
          <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="movie" className='w-100' />
          <div className={home.overly}>Click Here Show Details</div>
          <h3>{movie.title}</h3>
        </div>
        </Link>
      </div>)}
  </div>
  <div className="row align-items-center">
    <div className="col-md-4">
        <div className={home.title}>
          <h2 className='align-items-center'>Trending Tv To Watch</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>
      {allTv.map((tv , index)=> <div key={index} className="col-md-4">
      <Link to={`/movieDateils/tv/${tv.id}`}>
      <div className={home.tv}>
          <img src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} alt="movie" className='w-100' />
          <div className={home.overly}>Click Here Show Details</div>
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
