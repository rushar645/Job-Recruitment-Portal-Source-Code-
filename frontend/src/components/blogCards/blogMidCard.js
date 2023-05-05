import "./blogMidCard.css";
import { Buffer } from "buffer";


function BlogMidCard(props){

console.log(props);
    const blogImgStyle={
        background: `url(data:image/png;base64,${Buffer.from(props.blogdata.blogImg.data,'binary').toString('base64')})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }

    return (
        <div className="blogMidCardContainer">
            <div className="blogImgContainer" style={blogImgStyle}></div>
            <div className="blogContentContainer">
                <div className="blogContentHeaderContainer"><h3> {props.blogdata.blogTitle} </h3></div>
                <div className="blogContentDataContainer"><p>{props.blogdata.blogContent}</p> </div>
            </div>
        </div>
    );
}

export default BlogMidCard;