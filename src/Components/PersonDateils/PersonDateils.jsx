






import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function PersonDateils() {

   let {id} = useParams()
   const [objeDetails , setobjeDetails] = useState(null)

 async function getPersonDetails() {
 let {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=cdcde4803724b426cdec2081ce359e11&language=en-US`);
 setobjeDetails(data)
}


useEffect(()=> {
    getPersonDetails();
} , [])


  return <>

{objeDetails?  <div className="container">
    <div className="row mt-5">
        <div className="col-md-4">
            <div className="poster">
                <img src={"https://image.tmdb.org/t/p/w500" + objeDetails.profile_path} alt="poster" className='w-100' />
            </div>
        </div>
        <div className="col-md-8">
            <div className="movieDateils">
            <h4><span className='text-danger'>Name:</span>{objeDetails.name}</h4>
            <p className='mb-5 mt-5'><span className='text-danger'>Birthday:</span>{objeDetails.birthday}</p>
            {objeDetails.genres?.map((elem , index)=> <span key={index} className='bg-info p-3 rounded-circle m-3'>
            {elem.name}
            </span>)}
                <h6 className='mt-5'><span className='text-danger'>known_for_department:</span>{objeDetails.known_for_department}</h6>
                <h6 className='mt-4'><span className='text-danger'>place_of_birth:</span>{objeDetails.place_of_birth}</h6>
            </div>
        </div>
    </div>
  </div> : <div className="vh-100 d-flex justify-content-center align-items-center">
  <i class="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
  </div>}
  </>
}