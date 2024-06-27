const middleware = require("./middlewarePost");

const middId=(req,res,next)=>{
    const id=req.params.contactId;
    if(!id){
        return res.status(400).json({message:"Please provide id"});
    }
    next()
}

module.exports= middId;