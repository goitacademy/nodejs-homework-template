// const asyncWrapper=()=>{
// return(res,req,next)=>{
//     controller(req,res).catch(next)
// }
// } 

//что б везде была асинхронка

const errorHandler=(error,req,res,next)=>{
    
    res.status(500).json({message:error.message})
}
module.exports={
    errorHandler,
    asyncWrapper
}