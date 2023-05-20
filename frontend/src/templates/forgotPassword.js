import { useState } from "react";
import "./forgotPassword.css";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const btnsx={
    width:"50%"
}
function ForgotPassword() {

    const [email,setEmail]=useState('');

    const handleforgotPwd=async()=>{
    var emailFormat = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(email===''){
            toast.warning("Please Enter Email", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored",
                className: "toast-message"
              });
              return false;
        }
        if(!email.match(emailFormat)){
            toast.warning("Please Enter valid Email", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored",
                className: "toast-message"
              });
              return false;
        }
        let res=await axios.post("/api/forgotPassword",{email:email});

        console.log(res);

        if(res.status===234){
            toast.success("Email Sent", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored",
                className: "toast-message"
              });
              return false;
        }else if(res.status===236){
            toast.error("This email is not associated with any account. Please try a different email", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored",
                className: "toast-message"
              });
        }
    }
    return (
        <div className="mainforgotContainer">
            <div className="forgotContainer">
                <label><input type="email" value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/></label>
                <Button variant="contained" sx={btnsx} onClick={handleforgotPwd} >Send Mail</Button>
            </div>
        </div>
    );
}

export default ForgotPassword;