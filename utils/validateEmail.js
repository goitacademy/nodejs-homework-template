const httpErr = require("./HTTPErr");
const { emailValidator } = require("../utils/dataValidator");

const validateEmail = () => {
  const func = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(httpErr(400, "Missing required field email"));
    }

    const { error } = await emailValidator(req.body);

    if (error) {
      next(httpErr(400, "Email not valid"));
    }

    next();
  };

  return func;
};

module.exports = validateEmail;
