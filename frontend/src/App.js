import "./App.css";
import Navbar from "./partials/navbar";
import { ToastContainer } from "react-toastify";
// import { useEffect} from 'react';
import { AuthProvider} from "./contexts/AuthContext";
// import axios from "axios";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
