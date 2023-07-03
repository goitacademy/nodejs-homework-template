// const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");

// const authMiddleware = (req, res, next) => {
//   const [bearer, token] = req.headers.authorization.split(" ");
//   try {
//     if (!token || bearer !== "Bearer") {
//       throw new HttpError(401, "Not authorized");
//     }
//     const user = jwt.verify(token, process.env.SECRET_KEY);

//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.message === "Invalid signature") {
//       throw new HttpError(401, "Not authorized");
//     }
//     next(error);
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ _id: decoded._id, token });
    if (!user) {
      throw new HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
