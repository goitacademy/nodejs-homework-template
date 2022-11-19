const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const {SECRET} = require("../config");
// require("dotenv").config();

// const SECRET = process.env.SECRET;

const check = async (req, res, next) => {
  console.log("req", req);
  try {
    const {authorization = 0} = req.headers;

    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer" || token === "") {
      next(new Unauthorized("Not authorized!!!"));
    }

    const {id} = jwt.verify(token, SECRET);
    const user = await User.findById(id);
    if (!user) {
      next(new Unauthorized("Not authorized!!!!"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized("Not authorized!!!!!"));
  }
};

module.exports = {
  check,
};

// const jwt = require("jsonwebtoken");
// const {SECRET} = require("./config");
// const {Unauthorized} = require("http-errors");
// const User = require("../models/user");
// // const secret = process.env.SECRET;

// const check = async (req, res, next) => {
//   const secret = SECRET;

//   const {authorization = 0} = req.headers;
//   if (!authorization) return next(new Unauthorized("Not authorized!"));

//   const [typeToken, token] = authorization.split(" ");
//   if (typeToken !== "Bearer" || token === "")
//     return next(new Unauthorized("Not authorized!!"));

//   try {
//     const isAutorizate = jwt.verify(token, secret);
//     const user = await User.findOne({_id: isAutorizate._id});
//     if (!user || user.token !== token)
//       return next(new Unauthorized("Not authorized!!!"));
//     req.userId = isAutorizate._id;
//     return next();
//   } catch (error) {
//     if (error.name) return next(new Unauthorized(error.name));
//     return next(error);
//   }
// };
// module.exports = check;
