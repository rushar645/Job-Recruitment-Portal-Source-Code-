import { useEffect, useState  } from "react";
import "./viewProfilePage.css";
import {useParams} from 'react-router-dom';
import axios from 'axios';

const ViewProfilePage = () => {
    let userId=useParams();
    const [user,setUser]=useState({});

    let url=`/api/getUser/${userId.id}`;
    useEffect(()=>{
        const getUserData=async()=>{
            let res= await axios.get(url);

            console.log(res.data);
            setUser(res.data);
        }

        getUserData();
    },[url]);

    return (
        <div className="viewProfilePageMainContainer">
            <div className="profileHeaders">
                <div className="imageHeader"></div>
                <div className="otherHeader"></div>
            </div>
            <div className="profileBody">

            </div>

        </div >
    );
}

export default ViewProfilePage;