const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env;
const User = require('../models/users')

const authenticate = async(req, res, next) =>{

const {authorization = ""} = req.headers;
const [bearer, token] = authorization.split(" ");
if(bearer !== "Bearer"){
   return res.status(401).json({ message: "Not authorized" });
}
try{
const {id} = jwt.verify(token, SECRET_KEY);
const user = await User.findById(id);
if(!user){
    return res.status(401).json({ message: "Not authorized" }); 
}
req.user = user;
next();
}
catch{
    return res.status(401).json({ message: "Not authorized" });
}
}

module.exports = authenticate;