const { HTTP401Error } = require("../../helpers/errorHandlers");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");

const authTokenValidation = async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { authorization = "" } = req.headers;
  const [tokenType, token] = authorization.split(" ");

  try {
    if (tokenType !== "Bearer") {
      throw new HTTP401Error("Invalid tokenType");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new HTTP401Error("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authTokenValidation;
