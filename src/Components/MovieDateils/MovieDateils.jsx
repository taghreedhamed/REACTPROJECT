

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MovieDateils() {

   let {id , media} = useParams()
   const [objeDetails , setobjeDetails] = useState(null)

 async function getMovieDetails() {
 let {data} = await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=cdcde4803724b426cdec2081ce359e11&language=en-US`);
 setobjeDetails(data)
}


useEffect(()=> {
    getMovieDetails()
} , [])


  return <>

{objeDetails?  <div className="container">
    <div className="row mt-5">
        <div className="col-md-4">
            <div className="poster">
                <img src={"https://image.tmdb.org/t/p/w500" + objeDetails.poster_path} alt="poster" className='w-100' />
            </div>
        </div>
        <div className="col-md-8">
            <div className="movieDateils">
            <h4 className='mb-5'>{objeDetails.title}</h4>
            {objeDetails.genres?.map((elem , index)=> <span key={index} className='bg-danger p-3 rounded-circle m-3'>
            {elem.name}
            </span>)}
                <h6 className='mt-5 mt-5'><span className='text-danger'>Vote:</span> {objeDetails.vote_average}</h6>
                <h6 className='mt-4 mt-5'><span className='text-danger'>Vote:</span> {objeDetails.vote_count}</h6>
                <p className='mb-5 mt-5'><span className='text-danger'>Overview</span> {objeDetails.overview}</p>
            </div>
        </div>
    </div>
  </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
  <i class="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
  </div>}
  </>
}

