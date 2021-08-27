const { asuncWrapper } = require("../helpers/asunc_wrapper");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/userModel");
const { Unauthorized } = require("http-errors");

exports.authorize = asuncWrapper(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(payload.id);
    if (!user || !user.token) {
      throw new Unauthorized();
    }
    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    next(new Unauthorized());
  }
});
