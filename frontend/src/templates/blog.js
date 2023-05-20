import { Button } from "@mui/material";
import BlogMidCard from "../components/blogCards/blogMidCard";
import BlogSmallCard from "./../components/blogCards/blogSmallCard";
import "./blog.css";
import Footer from "./../partials/footer";
import { useEffect, useState } from "react";
import axios from 'axios';
import defaultImg from './../static/images/contacts.png'
import { useNavigate, Link } from 'react-router-dom';


const blogData = {
    title: "this is a title",
    content: `A wise Instagram bio once said, “The happiness of your life depends on the quality of your thoughts.” Well, sometimes you can find a little extra happiness when you dress those thoughts up with a cool font.

    Content on Instagram, Twitter, Twitch, TikTok and everywhere else online is prolific—it’s hard to stand out, even in a small group. That’s because the universal font each platform uses makes all content blend together.

    With a font generator, doom scrollers will stop in their tracks simply because what you’ve written looks different and interesting—bonus points if it’s also worth reading.A wise Instagram bio once said, “The happiness of your life depends on the quality of your thoughts.” Well, sometimes you can find a little extra happiness when you dress those thoughts up with a cool font.

    Content on Instagram, Twitter, Twitch, TikTok and everywhere else online is prolific—it’s hard to stand out, even in a small group. That’s because the universal font each platform uses makes all content blend together.

    With a font generator, doom scrollers will stop in their tracks simply because what you’ve written looks different and interesting—bonus points if it’s also worth reading.`
}

const viewAllBtnSx = {
    textTransform: "capitalize", height: "5vh",
    "&:hover": {
        backgroundColor: "black",
        color: "white",
        WebkitBoxShadow: "3px 3px 15px 5px rgba(79, 79, 79, 0.55)",
        MozBoxShadow: "3px 3px 15px 5px rgba(79, 79, 79, 0.55)",
        boxShadow: "3px 3px 15px 5px rgba(79, 79, 79, 0.55)"
    },
    "&:active": {
        boxShadow: "none"
    }
}

function Blog() {
    const [currUser, setCurrUser] = useState();
    const [allBlogs, setAllBlogs] = useState();
    // const [personalBlogs, setPersonalBlogs] = useState();

    const navigate = useNavigate();

    const filterBlog=(blogs,userdata)=>{
        console.log(blogs,userdata);
        let filterredArray=blogs?.filter((b)=> {console.log(b.username===userdata.username);return b.username===userdata.username});
        console.log("FA: ",filterredArray);
        return filterredArray;
    }

    useEffect(() => {
        const getUserData = async () => {
            const userData = await axios.get("/api/getUserRoles");
            setCurrUser(userData.data.userData);
        }
        getUserData();
        const getBlogData = async () => {
            const blogData = await axios.get("/api/blog").then((response) => { return response }).catch((err) => { console.log(err) });
            // console.log("BLOGDATA: ",blogData);
            setAllBlogs(blogData.data.blogData);
        }
        getBlogData();
    }, [])



    console.log(currUser, allBlogs);


    return (
        <>
            <div className="blogMainContainer">
                <div className="latestBlogsContainer">
                    <h2>All Blogs</h2>
                    <div className="allBlogsContainer">
                        {allBlogs?.map((blog) => (
                            <Link key={blog._id} to={"/blog/viewBlog/" + blog._id}>
                                <BlogMidCard blogdata={blog} />
                            </Link>
                        ))}
                        {/* <BlogMidCard blogdata={blogData} />
                        <BlogMidCard blogdata={blogData} />
                        <BlogMidCard blogdata={blogData} />
                        <BlogMidCard blogdata={blogData} />
                        <BlogMidCard blogdata={blogData} />
                        <BlogMidCard blogdata={blogData} />
                        <BlogMidCard blogdata={blogData} /> */}
                    </div>
                    {/* <Button variant="contained" sx={viewAllBtnSx}>View all</Button> */}
                </div>
                {currUser ? <div className="popularBlogsContainer">
                    <div className="topContainer">
                        <div><img src={currUser.userImg in currUser ? currUser.userImg : defaultImg} alt="" /></div>
                        <h2>{currUser.username}</h2>
                        <h4>{currUser.Email}</h4>
                        <Button variant="contained" sx={viewAllBtnSx} onClick={() => { navigate("/blog/createBlog") }} >Create Blog</Button>
                    </div>
                    <div className="bottomContainer">
                        <h2>My Blogs</h2>
                        <div className="allBlogsContainer">
                            {filterBlog(allBlogs,currUser)?.map((blog) => (
                                <Link key={blog._id} to={"/blog/viewBlog/" +blog._id}>
                                    <BlogSmallCard blogdata={blog} />
                                </Link>
                            ))}
                        </div>
                        {/* <BlogSmallCard blogdata={blogData} />
                        <BlogSmallCard blogdata={blogData} />
                        <BlogSmallCard blogdata={blogData} />
                        <BlogSmallCard blogdata={blogData} /> */}
                        {/* <Button variant="contained" sx={viewAllBtnSx}>View all</Button> */}
                    </div>
                </div>
                    :
                    <div className="linkToLogin">
                        <Link to="/login"><h2>Login to create blog</h2></Link>
                    </div>}
            </div>
            <Footer />
        </>
    )
}

export default Blog;