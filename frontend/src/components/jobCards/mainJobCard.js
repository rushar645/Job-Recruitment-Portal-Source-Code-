import "./mainJobCard.css";

function MainJobCard(props) {
    return (
        <div className="mainJobCardContainer">
            <div className="jobCardHeaders">
                <div className="companyLogo"><img src={props.jobData.companyLogo} alt={props.jobData.companyName} /></div>
                <div className="jobCompanyHeader">
                    <div className="jobTitleHeader"><h3>{props.jobData.jobTitle}</h3></div>
                    <div className="companyName">{props.jobData.companyName}</div>
                </div>
                <div className="categoryContainer"><h5>{props.jobData.category}</h5></div>
            </div>
            <div className="jobDetailsContainer">
                <ul type="none" className="jobAttributesContainer">
                    <li>Job Type: <strong> &nbsp;&nbsp;{props.jobData.jobType}</strong></li>
                    <li>Expeience: <strong> &nbsp;&nbsp;{props.jobData.experience} yrs</strong></li>
                    <li>Expected CTC: <strong> &nbsp;&nbsp;{props.jobData.expectedSalary} LPA</strong></li>
                </ul>
                <p>{props.jobData.jobDescription}</p></div>
        </div>
    );
}

export default MainJobCard;