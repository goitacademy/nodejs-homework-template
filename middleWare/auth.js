const jwt = require("jsonwebtoken");

const {Unauthorized} = require("http-errors");
const User = require("../models/user");
// const secret = process.env.SECRET;

const authen = async (req, res, next) => {
  const secret = process.env.SECRET;

  const {authorization = 0} = req.headers;
  if (!authorization) return next(new Unauthorized("Not authorized"));

  const [typeToken, token] = authorization.split(" ");
  if (typeToken !== "Bearer") return next(new Unauthorized(`!== "Bearer"`));

  try {
    const isAutorizate = jwt.verify(token, secret);
    const user = await User.findOne({_id: isAutorizate._id});
    if (!user || user.token !== token)
      return next(new Unauthorized("Not authorized"));
    req.userId = isAutorizate._id;
    return next();
  } catch (error) {
    if (error.name) return next(new Unauthorized(error.name));
    return next(error);
  }
};
module.exports = authen;

// const passport = require("passport");
// require("../config/passport");

// const authen = (req, res, next) => {
//   // console.log("req", req.user);
//   passport.authenticate("jwt", {session: false}, (err, user) => {
//     console.log("user::", user);
//     console.log("err", err);
//     const token = req.get("Authorization")?.split(" ")[1];
//     console.log("token:", token);
//     if (!user || err || token !== user.token) {
//       return next({
//         status: 401,
//         message: "Not authorized",
//       });
//     }
//     req.user = user;
//     return next();
//   })(req, res, next);
// };

// module.exports = {authen};
