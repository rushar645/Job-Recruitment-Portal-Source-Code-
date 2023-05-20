const jobModel=require("./../database/model/jobModel");

module.exports.createNewJob=async(jobData)=>{
  console.log("SERVICE: ",jobData);
  let createJob=await jobModel.create(jobData);
//   console.log(createJob);
}

module.exports.findJob=function(id){
  return jobModel.find({_id:id})
}

module.exports.findAllJobs=function(){
  return jobModel.find({})
}

module.exports.updateData=async(id,jobData)=>{
  let createJob=await jobModel.updateOne({_id:id},jobData,{upsert:true});
}

module.exports.removeById=async(id)=>{
  let removedJob=await jobModel.findByIdAndDelete(id);
  return removedJob;
}