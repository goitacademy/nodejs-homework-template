const { HttpCode } = require("../config/constants");
const { FORBIDDEN } = require("../messages/role-message");

const role = (role) => (req, res, next) => {
  const userRole = req.user.subscription;
  if (userRole !== role) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: "error",
      cod: HttpCode.FORBIDDEN,
      message: FORBIDDEN[req.app.get("lang")], // вытянули глобальную переменную
    });
  }
  return next();
};
module.exports = role;
