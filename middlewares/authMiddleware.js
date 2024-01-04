const HttpError = require("../controllers/helpers/error");
const authValidation = require("./validateAuth");
const services = require("../services");

exports.checkSignupData = async (req, res, next) => {
  const { value, error } = authValidation.registerSchema.validate(req.body);

  if (error) {
    throw new HttpError(400, "Invalid user data..", error);
  }
  await services.checkUserExists({ email: value.email });

  req.body = value;

  next();
};

exports.checkLoginData = async (req, res, next) => {
  const { value, error } = authValidation.loginSchema.validate(req.body);

  if (error) {
    throw new HttpError(401, "Not authrized..", error);
  }

  req.body = value;

  next();
};

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith("Bearer") && req.headers.authorization.split(" ")[1];
  if (!token) throw new HttpError(401, "Unauthorized");

  const userId = services.checkToken(token);
  if (!userId) throw new HttpError(401, "Not logged in..");

  const currentUser = await services.getOneUser(userId);
  if (!currentUser) throw new HttpError(401, "Not logged in..");

  req.user = currentUser;

  next();
};

exports.checkSubscriptionData = async (req, res, next) => {
  if (!req.body.subscription) {
    throw new HttpError(400, "No subscription field in the body", error);
  }

  if (!["starter", "pro", "business"].includes(req.body.subscription)) {
    throw new HttpError(400, "Subscription with wrong value", error);
  }

  next();
};
