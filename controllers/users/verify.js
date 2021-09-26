const User = require("../userRequest");
const { HttpCode } = require("../../helpers/constants");

const verify = async (req, res, next) => {
  try {
    const user = await User.findByVerificationToken(
      req.params.verificationToken
    );
    // console.log(req.params);

    if (user) {
      // console.log(user.id);
      await User.updateTokenVerify(user.id, true, null);
      return res.json({
        status: "success",
        code: 200,
        data: { message: "Verification successful" },
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "Not Found",
      code: HttpCode.NOT_FOUND,
      message: "User not found",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
