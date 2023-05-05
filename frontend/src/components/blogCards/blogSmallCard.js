import "./blogSmallCard.css";
import { Buffer } from "buffer";


function blogSmallCard(props) {

    console.log(props);

    const smallCardImgContainer={
        background: `url(data:image/png;base64,${Buffer.from(props.blogdata.blogImg.data,'binary').toString('base64')})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "norepeat"
    }

    return (
        <div className="smallCardContainer">
            <div className="smallCardImgContainer" style={smallCardImgContainer}>
            </div>
            <div className="smallCardContentContainer">
                <div className="smallCardContentHeader">
                    <h4>{props.blogdata.blogTitle}</h4>
                </div>
                <p>{props.blogdata.blogContent}</p>
            </div>
        </div>
    );
}

export default blogSmallCard;