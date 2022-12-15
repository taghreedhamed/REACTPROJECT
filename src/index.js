

import ReactDOM from 'react-dom/client';
import App from './App';


// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';


let myDive = document.getElementById('root');
let rootElement =ReactDOM.createRoot(myDive);

rootElement.render(
    <App/>
);