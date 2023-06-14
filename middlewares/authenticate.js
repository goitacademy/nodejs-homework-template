const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  // console.log(typeof bearer);
  // if (bearer.trim() !== "Bearer") {
  //   next(new Error(401));
  // }
  try{
  const userFromToken = jwt.verify(token, SECRET_KEY);
  console.log(userFromToken);
    const user = await User.find({_id: userFromToken.userId});
    console.log(user);
    // if (!user || !user.token || user.token !== token) {
    //   next(new Error(401));
    // }
    req.user = user;
    next();
  } catch{
    next(new Error(401));
  }

};

module.exports = { authenticate };
