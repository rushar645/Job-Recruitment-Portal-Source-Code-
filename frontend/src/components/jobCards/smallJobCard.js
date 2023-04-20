import "./smallJobCard.css";

const SmallJobCard=(props)=>{
    console.log(props.jobData);
    return(
        <div className="smallJobCardMainContainer">
            <div className="smallJobCardHeaders">
                <div className="imageHeader"><img src={props.jobData.companyLogo} alt={props.jobData.companyName}/></div>
                <div className="titleHeader"></div>
            </div>
            <div className="smallJobCardAttributes"></div>
            <div className="smallJobCardDetails"></div>
        </div>
    )
}

export default SmallJobCard;