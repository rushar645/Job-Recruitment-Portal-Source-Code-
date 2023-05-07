import "./smallJobCard.css";
import { Buffer } from "buffer";

const SmallJobCard = (props) => {
    // console.log(props.jobData);
    // let img= require("./../../../../backend/uploads/companyLogos/careermeet.png");

    const getImgData=(data)=>{
        let url=`data:image/png;base64,${Buffer.from(data.data, 'binary').toString('base64')}`;
        return url
    }


    return (
        <div key={props.jobData._id} className="smallJobCardMainContainer">
            <div className="smallJobCardHeaders">
                <div className="imageHeader"><img src={getImgData(props.jobData.companyLogo)} title={props.jobData.companyName} alt={props.jobData.companyName} /></div>
                <div className="titleHeader">
                    <h3>{props.jobData.jobTitle}</h3>
                    <h4>{props.jobData.companyName}</h4>
                </div>
            </div>
            <div className="smallJobCardAttributes">
                <li>Job Type: <strong> &nbsp;&nbsp;{props.jobData.jobType}</strong></li>
                <li>Experience: <strong> &nbsp;&nbsp;{props.jobData.experience} yrs</strong></li>
                <li>Expected CTC: <strong> &nbsp;&nbsp;{props.jobData.expectedCtc} LPA</strong></li>
            </div>
            <div className="smallJobCardDetails">
                <p>{props.jobData.jobDescription}</p>
            </div>
        </div>
    )
}

export default SmallJobCard;