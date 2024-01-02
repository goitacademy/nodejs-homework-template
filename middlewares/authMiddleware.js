//----------------------------------------------------------------
// const shema = require("../Shema");
const { userServices } = require("../services");
const { contactSchema } = require("../Shema");
const { signupSchemaValidation } = require("../Shema/shema");

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
  const { value, error } = loginSchemaValidation(req.body);
  if (error) throw new Error(401, "Invalid user data");
  // проверяем есть ли пользователь в базе
  req.body = value;
  next();
};
//----------------------------------------------------------------
const protect = async (req, res, next) => {
  const tokem =
    req.headers.authorization?.startsWith("Bear") &&
    req.headers.authorization.split(" ")[1];
};

//----------------------------------------------------------------
module.exports = {
  checkSing,
  checkLogin,
};
