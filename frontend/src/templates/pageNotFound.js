import NotFound from "./../static/images/NotFound.png";

const PageNotFound=()=>{
    return(
        <div style={{height: "88vh",width: "100%",display: "flex", flexDirection: "row", justifyContent: "center", alignItems:"center" }} >
            <img src={NotFound} style={{height:"auto" , width: "60%"}} alt="Page Not Found" />
        </div>
    )
}

export default PageNotFound;