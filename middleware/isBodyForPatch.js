const { HttpErrors } = require("../helpers")
const isBodyForPatch=(req, res, next)=>{
        const {favorite}=req.body
        if(!favorite){
            next(HttpErrors(400, "missing field favorite"))
        } else{
            next()
        }
}

module.exports=isBodyForPatch