import { useParams } from "react-router-dom";
import "./viewBlogPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";


const ViewBlogPage = () => {

    let blogId = useParams();
    const [foundBlog, setFoundBlog] = useState();
    const [blogContent, setBlogContent] = useState();
    const [imgUrl, setImgUrl] = useState(true);

    let url = `/api/viewBlog/${blogId.id}`;



    useEffect(() => {
        const getBlogData = async () => {
            let res = await axios.get(url).then((response) => { return response }).catch((err) => { console.log(err) })
            setFoundBlog(res.data.blog);
            setBlogContent(res.data.blog.blogContent.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
            setImgUrl(`data:image/png;base64,${Buffer.from(res.data.blog.blogImg.data, 'binary').toString('base64')}`);
            // setIsLoading(false);
        }
        getBlogData();
    }, [url]);

    console.log(foundBlog, blogContent);
    return (
        <div className="viewBlogMainContainer">
            <div className="blogContainer">
                <div className="blogTitleContainer"><h1>{foundBlog?.blogTitle}</h1><p>By: <address>{foundBlog?.username}</address></p></div>
                {imgUrl?<div className="blogImgContainer" style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div> : ""}
                <div className="blogContentContainer"><p dangerouslySetInnerHTML={{__html: blogContent}}></p></div>
            </div>
        </div>
    )
}

export default ViewBlogPage;