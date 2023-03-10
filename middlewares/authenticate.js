const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpErorr } = require("../helpers");




const authenticate = async (req, res, next) => {
    const { SECRET_KEY } = process.env;
  const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
  
  if (bearer !== "Bearer") {
    console.log("1");
    next(HttpErorr(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      
    console.log("2 user", user);
    if (!user || !user.token || !user.token === token) {
      console.log("3");
      next(HttpErorr(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    console.log("4");
    next(HttpErorr(401, "Not authorized"));
  }
};
module.exports = authenticate;
