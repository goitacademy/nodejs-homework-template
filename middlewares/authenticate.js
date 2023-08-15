const jwt = require("jsonwebtoken");

const { AppError, catchAsync } = require("../utils/errorHandlers");
const service = require("../model/users");
const { SECRET_KEY } = process.env;

const authenticate = catchAsync(async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new AppError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await service.findUserById(id);
    if (!user || !user.token || user.token !== token) {
      throw new AppError(401, "Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new AppError(401, "Not authorized");
  }
});

module.exports = authenticate;
