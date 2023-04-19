import "./search.css";
import Footer from "./../partials/footer";
import { Button } from "@mui/material";
import Select from "react-select";
import MainJobCard from "../components/jobCards/mainJobCard";

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

function Search() {
    return (
        <div className="mainSearchBodyContainer">
            <div className="mainSearchHeaderContainer">
                <div className="searchHeaders">
                    <h1>Get hired on your dream job!</h1>
                    <h4>Numerous jobs for the taking</h4>
                </div>
                <div className="searchParamFieldsContainer">
                    <form action="/search" method="POST" className="searchParamFields">
                        <input type="text" placeholder="Enter Job Title/Skills" />
                        <Select options={selOption} name="categories" styles={selectMenuSx}>
                        </Select>
                        <Button variant="contained" sx={searchBtnSx}>
                            Search
                        </Button>
                    </form>
                </div>
            </div>
            <div className="mainSearchBottomBodyContainer">
                <div className="mainSearchOptionSection"></div>
                <div className="mainSearchResultsContainer">
                    <div className="resultJobCardsContainer">
                        <MainJobCard jobData={jobData[0]} />
                        <MainJobCard jobData={jobData[0]} />
                        <MainJobCard jobData={jobData[0]} />
                        <MainJobCard jobData={jobData[0]} />
                    </div>
                    <div className="paginationIndicators">
                        <h4>&lt;</h4>
                        <h4>1</h4>
                        <h4>2</h4>
                        <h4>3</h4>
                        <h4>4</h4>
                        <h4>&gt;</h4>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Search;