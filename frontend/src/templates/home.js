import "./home.css";
import Select from "react-select";
import Button from "@mui/material/Button";
import Footer from "./../partials/footer";
import DummyLogo from "./../static/images/dummyLogo.png";
import BlogSmallCard from "./../components/blogCards/blogSmallCard";
import SmallJobCard from "./../components/jobCards/smallJobCard";
import TestimonialCard from "./../components/testimonial/testimonialPortrait";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
// import {URLSearchParamsInit} from 'react-router-dom';
import { Buffer } from "buffer";

const selOption = [
    { value: "Engineering", label: "Engineering", clasName: " optionStyles" },
    { value: "Computer-Science", label: "Computer Science", className: "optionStyles" },
    { value: "Management", label: "Management", className: "optionStyles" },
    { value: "Sales", label: "Sales", className: "optionStyles" },
    { value: "Education", label: "Education", className: "optionStyles" },
    { value: "Architecture", label: "Architecture", className: "optionStyles" },
    { value: "Maintainence", label: "Maintainence", className: "optionStyles" },
    { value: "Administration", label: "Administration", className: "optionStyles" }
]

const searchBtnSx = {
    textTransform: "capitalize"
}

const selectMenuSx = {
    control: styles => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isSelected ? "#1976d2" : "white",
            color: isSelected ? "white" : "black",
            "&:hover": {
                backgroundColor: "#B2D4FF"
            }
        };
    }
};


const blogData = [{
    title: "this is a title",
    content: `A wise Instagram bio once said, “The happiness of your life depends on the quality of your thoughts.” Well, sometimes you can find a little extra happiness when you dress those thoughts up with a cool font.

    Content on Instagram, Twitter, Twitch, TikTok and everywhere else online is prolific—it’s hard to stand out, even in a small group. That’s because the universal font each platform uses makes all content blend together.

    With a font generator, doom scrollers will stop in their tracks simply because what you’ve written looks different and interesting—bonus points if it’s also worth reading.A wise Instagram bio once said, “The happiness of your life depends on the quality of your thoughts.” Well, sometimes you can find a little extra happiness when you dress those thoughts up with a cool font.

    Content on Instagram, Twitter, Twitch, TikTok and everywhere else online is prolific—it’s hard to stand out, even in a small group. That’s because the universal font each platform uses makes all content blend together.

    With a font generator, doom scrollers will stop in their tracks simply because what you’ve written looks different and interesting—bonus points if it’s also worth reading.`
}]

const jobData = [{
    companyName: "CareerMeet Inc.",
    companyLogo: require("./../static/images/sampleLogo.png"),
    jobTitle: "DEVELOPER",
    jobType: "Full Time",
    category: "Web Technology",
    jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    experience: "5",
    expectedSalary: "10"
}]

const testimonialData = [{
    userName: "Tushar Kumar",
    userComment: `One of the key features that impressed me about this job portal is its comprehensive job listings. The portal offers an extensive range of job opportunities from various industries, locations, and levels. I appreciate how detailed the job descriptions are, providing me with clear information about the job requirements, qualifications, and expectations.`
},{
    userName: "PST",
    userComment: `One of the things I appreciate most about this job portal is its wide range of job listings from various industries and locations. The job descriptions are detailed and informative, providing me with a clear understanding of the job requirements and the ideal candidate's qualifications.`
}]

function Home() {
    const [val, setVal] = useState('');
    const [blogs, setBlogs] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        var { data } = await axios.get('/api/');
        setVal(data);
        setBlogs(data.data.blogs)
    }
    console.log("VAL: ", val, blogs);

    const handleSearch = async (e) => {
        e.preventDefault();
        let url = `/search?search=${searchInput}&category=${category.value}`;
        console.log(url);
        navigate(url);
    }


    const getBase64ImgUrl=(data)=>{
        let url=`data:image/png;base64,${Buffer.from(data.companyLogo.data, 'binary').toString('base64')}`;
        return url;
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="homeBodyContainer">
            <div className="mainHomeContainer">
                <div className="headerImageContainer">
                    <div className="mainHomeHeadingContainer">
                        <h1 className="mainHomeHeading">Find your dream job here!</h1>
                        <h4 className="mainHomeSubHeading">Hundreds of jobs to choose from!</h4>
                    </div>
                    <div className="searchParamsBar">
                        <form className="searchParamsForm">
                            <input type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} placeholder="Enter Job Title/Skills" />
                            <Select options={selOption} value={category} onChange={setCategory} name="categories" styles={selectMenuSx}>
                            </Select>
                            <Button variant="contained" sx={searchBtnSx} onClick={handleSearch}>
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="jobRecommendationSection">
                    <div className="recHeadingContainer">
                        <h4>Recent Jobs</h4>
                        <h1 className="jobRecHeading">
                            Popular Jobs
                        </h1>
                    </div>
                    <div className="jobCardsContainer">
                        {val ? val.data.jobs.map((job) => (
                            <Link key={job._id} to={`/viewJob/${job._id}`}>
                                <SmallJobCard jobData={job} />
                            </Link>
                        )) : ""}
                        {/* <SmallJobCard jobData={jobData[0]}/>
                        <SmallJobCard jobData={jobData[0]}/>
                        <SmallJobCard jobData={jobData[0]}/>
                        <SmallJobCard jobData={jobData[0]}/> */}
                    </div>
                    <Link to="/search"><Button variant="contained">View All</Button></Link>
                </div>
                <div className="companyRecommendationSection">
                    <div className="recHeadingContainer">
                        <h4>Top Companies</h4>
                        <h1>Prospective Employers</h1>
                    </div>
                    <div className="companyCardsContainer">
                        {val? val.data.companies?.map((company)=>{
                            return(
                                <img src={getBase64ImgUrl(company)} alt={company.companyName} title={company.companyName}/>
                            )
                        }):""}
                        {/* <img src={DummyLogo} alt="Dummy Logo" />
                        <img src={DummyLogo} alt="Dummy Logo" />
                        <img src={DummyLogo} alt="Dummy Logo" />
                        <img src={DummyLogo} alt="Dummy Logo" />
                        <img src={DummyLogo} alt="Dummy Logo" />
                        <img src={DummyLogo} alt="Dummy Logo" /> */}
                    </div>
                </div>
                <div className="blogRecommendationSection">
                    <div className="recHeadingContainer">
                        <h4>Our Blog</h4>
                        <h1>Tips from our Members</h1>
                    </div>
                    <div className="blogCardsContainer">
                        {blogs ? <Link key={blogs[0]._id} to={`/blog/viewBlog/${blogs[0]._id}`}><BlogSmallCard blogdata={blogs[0]} /></Link> : ""}
                        {blogs ? <Link key={blogs[1]._id} to={`/blog/viewBlog/${blogs[1]._id}`}><BlogSmallCard blogdata={blogs[1]} /></Link> : ""}
                        <Link to="/blog"><Button variant="contained"> Show All </Button></Link>
                    </div>
                </div>
                <div className="testimonialsSection">
                    <div className="recHeadingContainer">
                        <h4>Testimonials</h4>
                        <h1>Comments from our Users</h1>
                    </div>
                    <div className="testimonialsCardsContainer">
                        <TestimonialCard testimonialData={testimonialData[0]} />
                        <TestimonialCard testimonialData={testimonialData[1]} />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home;