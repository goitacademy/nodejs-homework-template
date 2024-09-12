const User = require("../models/user.model");
const { userVerification, send } = require("../service/email.service");
const Joi = require("joi");

const schemaValidationResend = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).trim().required(),
});
const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const result = await userVerification(verificationToken);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (err) {
    next(err);
  }
};

const verifyResend = async (req, res, next) => {
  try {
    const { error } = schemaValidationResend.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { email } = req.body;
    const user = await User.findOne({ email }).lean();

    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    } else if (user.verify) {
      return res.status(400).json({
        message: "Verification has already been passed",
      });
    } else {
      send(email, user.verificationToken);
      return res.status(200).json({
        message: "Verification email sent",
      });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  verifyUser,
  verifyResend,
};
