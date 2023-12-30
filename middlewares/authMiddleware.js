// const shema = require("../Shema");
const { userServices } = require("../services");
const { contactSchema, loginSchemaValidation } = require("../Shema");

// ----------------------------------------------------------------
const checkSing = async (req, res, next) => {
  console.log("================================================");
  console.log(req.body);
  console.log("================================================");
  const { value, error } = signupSchemaValidation(req.body);
  if (error) throw new Error(400, "Invalid user data", error);
  // проверяем есть ли пользователь в базе
  await userServices.checkUserExites({ email: value.email });
  req.body = value;
  next();
};

// ----------------------------------------------------------------
const checkLogin = async (req, res, next) => {
  console.log("================================================");
  console.log(req.body);
  console.log("================================================");
  const { value, error } = loginSchemaValidation(req.body);
  if (error) throw new Error(401, "Invalid user data", error);
  // проверяем есть ли пользователь в базе
  req.body = value;
  next();
};
module.exports = {
  checkSing,
};
