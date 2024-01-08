const { signupSchema } = require("../Shema/shema");
const { checkUserExists } = require("../services/userServices");
const User = require("../model/contactModel");
const jwtServices = require("../services/jwtServices");
const userServices = require("../services/userServices");
exports.checlLogin = async (req, res, next) => {};

exports.checlSignup = async (req, res, next) => {
  try {
    await signupSchema.validateAsync(req.body);
    await checkUserExists({ email: req.body.email });
    res.status(404).json({ message: "User already exists" });
  } catch (error) {
    if (error.message === "User already exists") {
    } else {
      const registrationResult = await signupServicesValidate(req.body);
      res.status(200).json({
        message: "User registered successfully",
        user: registrationResult.user,
        token: registrationResult.token,
      });
    }
  }
};

exports.protect = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];
  const userId = await jwtServices.checkToken(token);
  if (!userId) {
    return res.status(403).json({ message: "Error in protect" });
  }
  const currentUser = await userServices.getOneUser(userId);
  if (!currentUser) {
    return res.status(403).json({ message: "Error in protect" });
  }
  req.user = currentUser;
  next();
};
