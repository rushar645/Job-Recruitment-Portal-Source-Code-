import { useEffect } from "react";
import "./testimonialPortrait.css";

const TestimonialPortrait = (props) => {
    useEffect(() => {
        console.log(props.testimonialData);
    }, [props.testimonialData]);
    return (
        <div className="testimonialCardContainer">
            <div className="testimonialComments">
                <i><q>{ props.testimonialData.userComment}</q></i>
            </div>
            <div className="testimonialImage">
                <h4>{props.testimonialData.userName }</h4>
            </div>
        </div>
    )
}

export default TestimonialPortrait;