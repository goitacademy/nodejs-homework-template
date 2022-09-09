const jwt = require("jsonwebtoken");
const { Users } = require("../db/usersModel");

const authMiddlewar = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const token = authorizationHeader.replace("Bearer ", "");

    if (!token) {
      res.json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }

    const decodeJwt = jwt.decode(token, process.env.SECRET);
    const user = await Users.findOne({ _id: decodeJwt._id });
    if (!user) {
      res.json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }
    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authMiddlewar };
