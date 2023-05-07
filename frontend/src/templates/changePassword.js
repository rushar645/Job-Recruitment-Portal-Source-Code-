import React, { useState } from 'react';
import "./forgotPassword.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "./changePassword.css";
function ChangePassword() {

    const [isChecked, setIsChecked] = useState(false);
    const [changedPwd, setChangedPwd] = useState('');
    const [confirmChangedPwd, setConfirmChangedPwd] = useState('');

    let userid=useParams();
    const navigate=useNavigate();


    const handleChangePwd = async () => {
        if (confirmChangedPwd !== changedPwd) {
            toast.warning("Passwords do not match", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored",
                className: "toast-message"
            });
            return false;
        }
        if (confirmChangedPwd === '' || changedPwd === '' || confirmChangedPwd.length < 8 || changedPwd.length < 8) {
            toast.warning("Password must contain atleast 8 characters", {
                position: toast.POSITION.BOTTOM_CENTER,
                theme: "colored",
                className: "toast-message"
            });
            return false;
        } else if (changedPwd === confirmChangedPwd) {
            console.log(userid);
            let res = await axios.post(`/api/resetPassword/${userid.userid}`, { password: changedPwd });
            console.log(res);

            if (res.status === 235) {
                toast.success("Password changed successfully", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    theme: "colored",
                    className: "toast-message"
                });
                navigate("/login");
            }
        }


    }


    return (
        <div className="mainforgotContainer">
            <div className="forgotContainer">
                <label><input type={isChecked ? "text" : "password"} value={changedPwd} onChange={(e) => { setChangedPwd(e.target.value) }} placeholder="New Password" /></label>
                <label><input type={isChecked ? "text" : "password"} value={confirmChangedPwd} onChange={(e) => { setConfirmChangedPwd(e.target.value) }} placeholder="Confirm Password" /></label>
                <label><input type="checkbox" checked={isChecked} onChange={() => { setIsChecked(!isChecked) }} />Show Passwords</label>
                <Button variant="contained" onClick={handleChangePwd} >Reset Password</Button>
            </div>
        </div>
    )
}

export default ChangePassword;