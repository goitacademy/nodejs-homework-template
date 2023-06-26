const jwt = require("jsonwebtoken");
 const {User} = require("../models/userModel");

const createError = require("http-errors");


const { SECRET_KEY } = process.env;


const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  
  const [bearer, token] = authorization.split(" ");
  
  if (bearer !== "Bearer") {
    next(createError(401, { message: "Not authorized" }));
  }
  
  try {
    
    const { id } = jwt.verify(token, SECRET_KEY);
    
      const user = await User.findById(id);
     console.log("user", user);
    if (!user || !user.token || user.token !== token) {
      next(createError(401, { message: "Not authorized" }));
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.message === "Invalid signature") {
      err.status = 401;
    }
    throw err;
    // next(createError(401, { message: "Not authorized" }));
  }


};

module.exports = authenticate;
