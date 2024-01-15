const { HttpError } = require("../helpers");

const { registerUser } = require("../validators")

const validateBody = (User) => {
  const func = async (req, res, next) => {
    try {
    await registerUser.validateAsync(req.body)
      const user = new User(req.body);
      await user.validate();
      next();
    } catch (error) {
      next(HttpError(400, error.message));
    }
  };

  return func;
};

module.exports = validateBody;