import "./verifyAccount.css";
import tick from "./../static/images/tickmark.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const VerifyAccount = () => {
  const userid = useParams();
  const [isVerified, setIsVerified] = useState(false);
  console.log(userid);

  const handleRes = async () => {
    let res = await axios.get(`http://localhost:5000/verify/${userid.userid}`)
      .then((response) => { console.log(response); return response; })
      .catch((err) => { console.log(err) });
    console.log(res);
    if (res.status === 210) {
      setIsVerified(true);
    }
  };

  useEffect(() => {
    handleRes();
  });

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
