const User = require("../../repositories/users");
const { HttpCode } = require("../../helpers/constants");

const signup = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email in use",
      });
    }
    const { subscription, email } = await User.create(req.body);

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      user: { email, subscription },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = signup;
