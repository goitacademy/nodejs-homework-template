const jwt = require("jsonwebtoken");
const { HttpError, RANDOM_KEY} = require("../utils/index"); 
const User = require('../models/user');


const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
  
    if (bearer !== "Bearer" && token !== "") {
        next(HttpError(401));
    }
    
    try {    
      const data = jwt.verify(token, RANDOM_KEY);
      
      if (!data) {
        next(HttpError(401, "Not authorized"))    
      }
      const { _id } = data;    
      const user = await User.findById(_id);
        
      if (!user) {
        next(HttpError(401, "Not authorized"));
      }
      
     req.user = user;
     next();
        
    } catch {
        next(HttpError(401, "Not authorized"));
    }
};


module.exports = authenticate;


