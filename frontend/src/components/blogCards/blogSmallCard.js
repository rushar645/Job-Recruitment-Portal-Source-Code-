import "./blogSmallCard.css";
import img from "./../../static/images/trial.png";

const smallCardImgContainer={
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat"
}

function blogSmallCard(props){
    return (
        <div className="smallCardContainer">
            <div className="smallCardImgContainer" style={smallCardImgContainer}>
            </div>
            <div className="smallCardContentContainer">
                <div className="smallCardContentHeader">
                    <h4>{props.blogdata.title}</h4>
                </div>
                <p>{props.blogdata.content}</p>
            </div>
        </div>
    );
}

export default blogSmallCard;