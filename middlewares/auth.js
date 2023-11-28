const jwt = require("jsonwebtoken");
const User = require('../models/user');

function auth(req, res, next) {
// console.log(req.headers);
const authHeader = req.headers.authorization

if(typeof authHeader === "undefined") {
    return res.status(403).send({message: "Invalid Token"});
}

const [bearer, token] = authHeader.split(" ", 2);
if(bearer!=="Bearer"){
    return res.status(403).send({message: "Invalid Token"});
}

jwt.verify(token, process.env.JWT_SECRET, async (err, decode)=>{
    if(err){
        return res
        .status(500)
        .send({message:"Invalid Token"});
}
try {
    req.user=decode;
   const user = await User.findById(decode.id).exec();
    if(user===null){
        return res
        .status(500)
        .send({message:"Invalid Token"}); 
    }
    if(user.token!==token){
        return res
        .status(500)
        .send({message:"Invalid Token"}); 
    }
    
    res.user={id: user._id, email: user.email};

    next(); 
} catch (err) {
    next(err);
}
});
}

module.exports = auth; 
