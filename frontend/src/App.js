import './App.css';
import Navbar from './partials/navbar';
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [isAuthenticated, setAuthentication] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
  
    let res = await axios
      .get("http://127.0.0.1:5000/getUserRoles")
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Request Response: ", res);
      if (res.data) {
        console.log("User Found!");
        setAuthentication(!isAuthenticated);
      } else {
        console.log("User Not Found!");
      }
    };
    console.log("NAVBAR: ");
    fetchData();
  }, [isAuthenticated]);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <Navbar />
      <ToastContainer/>
    </>
  );
}

export default App;
