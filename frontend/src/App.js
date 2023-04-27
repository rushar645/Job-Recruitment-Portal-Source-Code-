import "./App.css";
import Navbar from "./partials/navbar";
import { ToastContainer } from "react-toastify";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { AuthProvider } from "./contexts/AuthContext";

function App() {
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
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
