const jwt = require("jsonwebtoken");

const userSchemaDB = require("../models/users");

const verefyToken = async (req, _, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    next({ status: 401, message: "Not authorized" });
    return;
  }

  const userData = jwt.decode(token);

  try {
    const isUser = await userSchemaDB.findById(userData?.id);
    const isTokenVerify = isUser?.token === token;

    if (!isUser || !isTokenVerify) {
      next({ status: 401, message: "Not authorized" });
      return;
    }

    req.user = isUser;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { verefyToken };
