
const middleware =(req,res,next)=>{
    const {
        name,
        email,
        phone

    } =req.body
    if(!name || !email || !phone){
        return res.status(400).json({"message": "missing required name field"})
        }
    next()
} 


module.exports = middleware;
