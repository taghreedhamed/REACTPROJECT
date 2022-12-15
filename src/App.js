

import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Main from './Components/Main/Main';
import Notfound from './Components/Notfound/Notfound';
import MovieDateils from './Components/MovieDateils/MovieDateils';
import Movies from './Components/Movies/Movies';
import Tv from './Components/Tv/Tv';
import Person from './Components/Person/Person';
import jwtDecode from 'jwt-decode';
import PersonDateils from './Components/PersonDateils/PersonDateils';

export default function App() {

     const [logInUser , setLogInUser] = useState(null);


      function ProtectedRoute(props) {
        if (localStorage.getItem('tkn') == null) {
          // return <><h2 className='text-white d-flex justify-content-center align-items-center mt-5'>
          //   Hello Go To Login Page Frist</h2></>
          return <Navigate to='/login'/>
        }
        else {
        return <> {props.children} </>
        }
      }

      function getLoggedInUser() {
        if (localStorage.getItem('tkn') != null) {
         let tkn = localStorage.getItem('tkn');
          let userData = jwtDecode(tkn);
          setLogInUser(userData);
          console.log(userData);
        }
      }


      function removeUserData() {
        localStorage.removeItem('tkn');
        setLogInUser(null);
      }


      function checkReload() {
        if (localStorage.getItem('tkn') != null && logInUser == null) {
          getLoggedInUser();
        }
      }

      useEffect(function () {
        checkReload(); 
      } , [])


  const router = createBrowserRouter([
        {path:'' , element: <Main  currentUser = {logInUser} remove={removeUserData}/> , children: [
        {path:'' , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
        {path:'home' , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
        {path:'movies' , element: <ProtectedRoute> <Movies/> </ProtectedRoute>},
        {path:'tv' , element: <ProtectedRoute> <Tv/> </ProtectedRoute>},
        {path:'person' , element: <ProtectedRoute> <Person/> </ProtectedRoute>},
        {path:'movieDateils' , element: <ProtectedRoute> <MovieDateils/> </ProtectedRoute> , children:[
        {path:':media' , children:[
        {path:':id'}]}]},
        {path:'personDateils' , element: <ProtectedRoute> <PersonDateils/> </ProtectedRoute> , children:[
          {path:':id'}]},
        {path:'login' , element: <Login logver={ getLoggedInUser }/>},
        {path:'register' , element: <Register/>},
        {path:'*' , element: <Notfound/>},
    ]}
]);
  return <>
  <RouterProvider router={router}/>  
  </>
}



