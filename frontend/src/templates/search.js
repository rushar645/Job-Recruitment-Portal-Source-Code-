import "./search.css";
import Footer from "./../partials/footer";
import { Button } from "@mui/material";
import Select from "react-select";
import MainJobCard from "../components/jobCards/mainJobCard";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const selOption = [
    { value: "Engineering", label: "Engineering", className: "optionStyles" },
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

// const jobData = [{
//     companyName: "CareerMeet Inc.",
//     companyLogo: require("./../static/images/sampleLogo.png"),
//     jobTitle: "DEVELOPER",
//     jobType: "Full Time",
//     category: "Web Technology",
//     jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     experience: "5",
//     expectedSalary: "10"
// }]

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState('');
    const [category, setCategory] = useState('');
    const [globalJobData, setGlobalJobData] = useState([]);
    const navigate = useNavigate();

    const searchReq = () => {
        navigate(`/search?search=${searchInput}&category=${category.value}`);
    }

    let searchData = {
        search: searchParams.get("search"),
        category: searchParams.get("category")
    }
    let url = `/api/search?search=${searchData.search}&category=${searchData.category}`;
    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get(url)
                .then((response) => {
                    if (response.status === 221) {
                        return response.data;
                    }
                }).catch((err) => { console.log(err) });
            setGlobalJobData(res.jobs);
            console.log(res);
        }
        fetchData();
    }, [url]);

    return (
        <div className="mainSearchBodyContainer">
            <div className="mainSearchHeaderContainer">
                <div className="searchHeaders">
                    <h1>Get hired on your dream job!</h1>
                    <h4>Numerous jobs for the taking</h4>
                </div>
                <div className="searchParamFieldsContainer">
                    <form action="/search" method="POST" className="searchParamFields">
                        <input type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} placeholder="Enter Job Title/Skills" />
                        <Select options={selOption} name="categories" styles={selectMenuSx} value={category} onChange={setCategory}>
                        </Select>
                        <Button variant="contained" sx={searchBtnSx} onClick={searchReq}>
                            Search
                        </Button>
                    </form>
                </div>
            </div>
            <div className="mainSearchBottomBodyContainer">
                {/* <div className="mainSearchOptionSection">
                    <div className="optionsContainer">
                        <div className="jobTypeOptions">
                            <h2>Job Type</h2>
                            <section>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Full-Time</label>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Part-Time</label>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Internship</label>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Contract</label>
                            </section>
                        </div>
                        <div className="jobTypeOptions">
                            <h2>Job Type</h2>
                            <section>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Full-Time</label>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Part-Time</label>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Internship</label>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Contract</label>
                            </section>
                        </div>
                        <div className="jobTypeOptions">
                            <h2>Job Type</h2>
                            <section>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Full-Time</label>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Part-Time</label>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Internship</label>
                                <label><input type="checkbox"/>&nbsp;&nbsp;Contract</label>
                            </section>
                        </div>
                    </div>
                </div> */}
                <div className="mainSearchResultsContainer">
                    <div className="resultJobCardsContainer">
                        {globalJobData.length > 0 ? globalJobData.map((data) => (
                            <Link key={data._id} to={`/viewJob/${data._id}`} >
                                <MainJobCard key={data._id} jobData={data} />
                            </Link>
                        )) : ""}
                    </div>
                    {/* <div className="paginationIndicators">
                        <h4>&lt;</h4>
                        <h4>1</h4>
                        <h4>2</h4>
                        <h4>3</h4>
                        <h4>4</h4>
                        <h4>&gt;</h4>
                    </div> */}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Search;