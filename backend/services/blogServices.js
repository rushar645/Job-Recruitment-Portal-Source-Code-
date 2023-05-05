const blogModel=require("./../database/model/blogModel");

module.exports.createNewBlog=async(blogData)=>{
  console.log("SERVICE: ",blogData);
  let createblog=await blogModel.create(blogData);
//   console.log(createblog);
}

module.exports.findBlog=function(id){
  return blogModel.find({_id:id})
}

module.exports.findAllBlogs=function(){
  return blogModel.find({})
}

module.exports.updateData=async(id,blogData)=>{
  let createblog=await blogModel.updateOne({_id:id},blogData,{upsert:true});
}
