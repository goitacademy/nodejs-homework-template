const jwt = require("jsonwebtoken");

const userSchemaDB = require("../models/users");

const verefyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    next({ status: 401, message: "Not authorized" });
    return;
  }

  const userData = jwt.decode(token);
  const isUser = await userSchemaDB.findById(userData?.id);
  const isTokenVerify = isUser?.token === token;
  console.log(!isUser && !isTokenVerify);

  if (!isUser || !isTokenVerify) {
    next({ status: 401, message: "Not authorized" });
    return;
  }

  req.user = isUser;

  next();
};

module.exports = { verefyToken };
