import "./blogMidCard.css";
import img from "./../../static/images/trial.png";

const blogImgStyle={
    background: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
}

function BlogMidCard(props){
    return (
        <div className="blogMidCardContainer">
            <div className="blogImgContainer" style={blogImgStyle}></div>
            <div className="blogContentContainer">
                <div className="blogContentHeaderContainer"><h3> {props.blogdata.title} </h3></div>
                <div className="blogContentDataContainer"><p>{props.blogdata.content}</p> </div>
            </div>
        </div>
    );
}

export default BlogMidCard;