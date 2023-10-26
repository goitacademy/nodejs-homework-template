const jwt = require("jsonwebtoken");
const requestError = require("./requestError.js");
const User = require("../models/usersSchema.js");
const tryCatchWrapper = require("./controllerWrapper.js");

const auth = async (req, res, next) => {
  const {JWT_SECRET} = process.env;
  
  if(!req.headers.authorization){
    throw requestError(401);
  }
    const reqToken = req.headers.authorization.substr(7);
    const user_id = jwt.verify(reqToken, JWT_SECRET, {}, (err, decoded) => {
      if(err) {
          throw requestError(401, err.message);
      }

      return decoded.user_id;
    });
  
  req.user = await User.findById(user_id, {password: 0, createdAt: 0, updatedAt:0})
  
  next();
}

module.exports = {auth: tryCatchWrapper(auth)};
