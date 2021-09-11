const { HttpCode } = require("../../helpers/constants");
const getCurrent = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Not authorized",
      });
    }
    const { id, email, subscription } = req.user;
    return res.json({
      status: "success",
      code: HttpCode.OK,
      id,
      email,
      subscription,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = getCurrent;
