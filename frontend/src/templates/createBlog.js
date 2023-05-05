import { useState } from "react";
import "./createBlog.css";
import { Button } from "@mui/material";
import axios from 'axios';


const btnSx = {
    textTransform: "capitalize",
    height: "5vh",
    width: "15vw",
    margin: "2vh",
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

const CreateBlog = () => {
    const [previewImg, setPreviewImg] = useState(require("./../static/images/previewImg.png"));
    const [blogTitle, setBlogTitle] = useState('');
    const [blogImg, setBlogImg] = useState('');
    const [blogContent, setBlogContent] = useState('');


    const sendBlogData = async () => {
        let formData = new FormData(document.blogForm);
        console.log(document.blogForm, formData);

        for (var [key, value] of formData.entries()) {
            console.log(key, " : ", value);
        }

        let res = await axios.post("/api/blog/createBlog",formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => { return response }).catch((err) => { console.log(err) });
        console.log(res);
    }

    return (
        <div className="createBlogMainContainer">
            <form name="blogForm" >
                <label>Blog Title<br /><input type="text" name="blogTitle" value={blogTitle} required onChange={(e) => { setBlogTitle(e.target.value) }} placeholder="Blog Title" /></label>
                <label htmlFor="previewHolder">Blog Image
                    <div className="previewHolder" id="previewHolder">
                        <img src={previewImg} alt="Preview">
                        </img>
                        <label htmlFor="blogImg"><input type="file" name="blogImg" id="blogImg" required style={{ display: "none" }} accept="image/*" onChange={(e) => { setPreviewImg(URL.createObjectURL(e.target.files[0])); setBlogImg(e.target.files[0]); }} />Blog Image</label>
                    </div>
                </label>
                <label>Blog Content<br /><textarea name="blogContent" placeholder="Blog Content" required value={blogContent} onChange={(e) => { setBlogContent(e.target.value) }} /></label>
                <Button variant="contained" sx={btnSx} onClick={(e) => { sendBlogData() }} >Create</Button>
            </form>
        </div>
    )
}

export default CreateBlog;