const { User } = require("../service/Schemas/userSchema");
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];

    try {
      const payload = jwt.verify(token, SECRET);
      console.log("verify jwt", payload);
      const { id } = payload;
      const user = await User.findById({ _id: id });
      if (!user || user.token !== token) {
        return res.status(401).json({
          status: "Unauthorized error",
          message: "Not authorized",
        });
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      // res.status(401).json({
      //     status: "Unauthorized error",
      //     message: "Not authorized",
      //   });
      next(err);
    }
  }
};

module.exports = auth;
