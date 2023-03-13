// const passport = require("passport");
// require("dotenv").config();

// const authMiddleware = async (req, res, next) => {
//   passport.authenticate("jwt", { session: false }, (err, user) => {
//     if (!user || err) {
//       return res.status(401).json({
//         data: "Not authorized",
//       });
//     }

//     req.user = user;

//     next();
//   })(req, res, next);
// };

// const jwt = require("jsonwebtoken");
// const { User } = require("../db/users");

// const authMiddleware = async(req, res, next) => {
//   const { JWT_SECRET } = process.env;
//   const { authorization = "" } = req.headers;
//   const [bearer, token] = authorization.split(" ");

//   try {
//     if (bearer !== "Bearer") {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     const { id } = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(id);

//     if (!user || !user.token) {
//       return res.status(204).json({ message: "No Content" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };


const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  //     if (bearer !== "Bearer")
  if (!token === "Bearer") {
    next(res.status(401).json({ message: "Not authorized" }));
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(res.status(400).json({ message: "Invalid token" }));
  }
};

module.exports = {
  authMiddleware,
};
