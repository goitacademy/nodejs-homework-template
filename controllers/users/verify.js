// const { User } = require("../../models");
// const createError = require("http-errors");
const services = require("../../services");
const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    await services.verifyEmail(verificationToken);
    // const user = await User.findOne({ verificationToken });
    // if (!user) {
    //   throw createError("404", "Not found");
    // }
    // await User.findByIdAndUpdate(user._id, {
    //   verify: true,
    //   verificationToken: null,
    // });
    res.status(200).json({
      message: "Verify success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
