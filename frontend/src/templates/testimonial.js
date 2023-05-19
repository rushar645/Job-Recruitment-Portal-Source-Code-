import React from 'react'
import TestimonialPortrait from '../components/testimonial/testimonialPortrait';
import './testimoial.css';

const testimonialData = [{
    userName: "Tushar Kumar",
    userComment: `One of the key features that impressed me about this job portal is its comprehensive job listings. The portal offers an extensive range of job opportunities from various industries, locations, and levels. I appreciate how detailed the job descriptions are, providing me with clear information about the job requirements, qualifications, and expectations.`
},{
    userName: "PST",
    userComment: `One of the things I appreciate most about this job portal is its wide range of job listings from various industries and locations. The job descriptions are detailed and informative, providing me with a clear understanding of the job requirements and the ideal candidate's qualifications.`
}]

function Testimonial() {
    return (
        <div className='testimonialContainer'>
            <h1>Testimonials</h1>
            <div>
                <TestimonialPortrait testimonialData={testimonialData[0]} />
                <TestimonialPortrait testimonialData={testimonialData[1]} />
            </div>
        </div>
    )
}

export default Testimonial;