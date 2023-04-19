import { Button } from "@mui/material";
import BlogMidCard from "../components/blogCards/blogMidCard";
import BlogSmallCard from "./../components/blogCards/blogSmallCard";
import "./blog.css";
import Footer from "./../partials/footer";

const createBlogButton = {
    height: "10%",
    width: "95%",
    marign: "1%",
    color: "#1976d2",
    transition: "all 0.3s linear",
    fontWeight: "600",
    textTransform: "capitalize",
    borderRadius: "10px",
    "&:hover": {
        backgroundColor: "#1976d2",
        color: "white"
    }
}

const blogData = {
    title: "this is a title",
    content: `A wise Instagram bio once said, “The happiness of your life depends on the quality of your thoughts.” Well, sometimes you can find a little extra happiness when you dress those thoughts up with a cool font.

    Content on Instagram, Twitter, Twitch, TikTok and everywhere else online is prolific—it’s hard to stand out, even in a small group. That’s because the universal font each platform uses makes all content blend together.
    
    With a font generator, doom scrollers will stop in their tracks simply because what you’ve written looks different and interesting—bonus points if it’s also worth reading.A wise Instagram bio once said, “The happiness of your life depends on the quality of your thoughts.” Well, sometimes you can find a little extra happiness when you dress those thoughts up with a cool font.

    Content on Instagram, Twitter, Twitch, TikTok and everywhere else online is prolific—it’s hard to stand out, even in a small group. That’s because the universal font each platform uses makes all content blend together.
    
    With a font generator, doom scrollers will stop in their tracks simply because what you’ve written looks different and interesting—bonus points if it’s also worth reading.`
}

const viewAllBtnSx = {
    textTransform: "capitalize",
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
    return (
        <>
            <div className="blogMainContainer">
                <div className="latestBlogsContainer">
                    <div className="blogSectionHeading" ><h2>Latest Articles</h2></div>
                    <BlogMidCard blogdata={blogData} />
                    <BlogMidCard blogdata={blogData} />
                    <Button variant="contained" sx={viewAllBtnSx}>View All</Button>
                </div>
                <div className="popularBlogsContainer">
                    <Button variant="outlined" sx={createBlogButton} >Create New Blog</Button>
                    <div className="popularBlogsSection">
                        <div className="blogSectionHeading" ><h2>Popular Articles</h2></div>
                        <BlogSmallCard blogdata={blogData} />
                        <BlogSmallCard blogdata={blogData} />
                        <Button variant="contained" sx={viewAllBtnSx}>View All</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Blog;