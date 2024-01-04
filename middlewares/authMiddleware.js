//----------------------------------------------------------------
// const shema = require("../Shema");
const { userServices, jwtService } = require("../services");
const { contactSchema } = require("../Shema");
const {
  signupSchemaValidation,
  loginSchemaValidation,
} = require("../Shema/shema");

// ----------------------------------------------------------------
const checkSing = async (req, res, next) => {
  console.log("================================================");
  console.log(req.body);
  console.log("================================================");
  const { name, email, password } = signupSchemaValidation(req.body);
  if (error) throw new Error(400, "Invalid user data", error);
  // проверяем есть ли пользователь в базе
  await userServices.checkUserExites({ email });
  req.body = { name, email, password };
  next();
};

// ----------------------------------------------------------------
const checkLogin = async (req, res, next) => {
  console.log("================================================");
  console.log(req.body);
  console.log("================================================");
  const { value, error } = loginSchemaValidation.validate(req.body);
  if (error) throw new Error(401, "Invalid user data");
  // проверяем есть ли пользователь в базе
  req.body = value;
  next();
};
//----------------------------------------------------------------
const protect = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bear") &&
    req.headers.authorization.split(" ")[1];
  const userId = jwtService.checkToken(token);
  if (userId) throw new Error(401, "Invalid user data");
  const currentUser = await userServices.getOneUser(userId);
  if (currentUser) throw new Error(401, "Invalid user data");
  req.user = currentUser;
  next();
};

//----------------------------------------------------------------
module.exports = {
  checkSing,
  checkLogin,
  protect,
};
