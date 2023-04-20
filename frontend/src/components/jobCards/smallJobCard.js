import "./smallJobCard.css";

const SmallJobCard = (props) => {
    console.log(props.jobData);
    return (
        <div className="smallJobCardMainContainer">
            <div className="smallJobCardHeaders">
                <div className="imageHeader"><img src={props.jobData.companyLogo} title={props.jobData.companyName} alt={props.jobData.companyName} /></div>
                <div className="titleHeader">
                    <h3>{props.jobData.jobTitle}</h3>
                    <h4>{props.jobData.companyName}</h4>
                </div>
            </div>
            <div className="smallJobCardAttributes">
                <li>Job Type: <strong> &nbsp;&nbsp;{props.jobData.jobType}</strong></li>
                <li>Expeience: <strong> &nbsp;&nbsp;{props.jobData.experience} yrs</strong></li>
                <li>Expected CTC: <strong> &nbsp;&nbsp;{props.jobData.expectedSalary} LPA</strong></li>
            </div>
            <div className="smallJobCardDetails">
                <p>{props.jobData.jobDescription}</p>
            </div>
        </div>
    )
}

export default SmallJobCard;