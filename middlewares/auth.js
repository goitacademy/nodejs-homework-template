const jwt = require("jsonwebtoken");
const {getUserById} = require("../service/index.js");

const auth = async (req,res,next)=>{
    try {
        const {authorization}=req.headers
   const [bearer, token]=authorization.split(" ");

   if(bearer !== "Bearer")
    {
        return res.status(401).json({
            "message": "Not authorized"
        })
    }
    
    const {id}= jwt.verify(token,process.env.SECRET_KEY)   
    const user=await getUserById(id)
    if(!user || user.token!==token)
    {
        return res.status(401).json({
            "message": "Not authorized"
        })
    }
    req.user = user   
    next()
    } catch (error) {
        return res.status(401).json({
            "message": "Not authorized"
        })
    }

}



module.exports = auth;