const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const newHttpError = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization } = req.body;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== Bearer) {
    next(newHttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
  } catch (error) {}
};

module.exports = authenticate;
