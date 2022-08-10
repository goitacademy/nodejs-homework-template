const jwt = require("jsonwebtoken");
const {User} = require("../models/user")
const {SECRET_KEY} = process.env;


const users = async(req, res, next) => {
  const {authorization = " "} = req.headers;
  const [bearer, token] = authorization.split(" ");
try {
    if(bearer !== "Bearer") {
        const error = new Error("Not authorized"); 
        error.status = 401;
        throw error;
      }
    const {id} = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
if(!user || !user.token) {
    const error = new Error("Not authorized"); 
    error.status = 401;
    throw error;
}
req.user = user;
next();
  } catch (error) {
    if(error.message === "Invalid signature") {
        error.status = 401;
    }
    next (error);
  }
}

module.exports = users;