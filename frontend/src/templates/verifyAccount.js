import "./verifyAccount.css";
import tick from "./../static/images/tickmark.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const VerifyAccount = () => {
  const userid = useParams();
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const handleRes = async () => {
      let res = await axios.get(`/api/verify/${userid.userid}`)
        .then((response) => { return response; })
        .catch((err) => { console.log(err) });
      console.log(res);
      if (res.status === 214) {
        setIsVerified(true);
      }
    };
    handleRes();
  },[userid]);

  return (
    <div className="mainContainer">
      {(() => {
        if (isVerified === true) {
          return (
            <>
              <h1>Account Verified</h1>
              <img src={tick} alt="Successful Verification" />
              <Link to="/login">
                <h1>Click here to Login.</h1>
              </Link>
            </>
          );
        }
      })()}
    </div>
  );
};

export default VerifyAccount;
