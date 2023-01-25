const userSchema = require('./schemas/userSchema');

function userValidation(req, res, next) {
  if (userSchema.validate(req.body).error) {
    res.status(400).json({ message: userSchema.validate(req.body).error.message });
  } else {
    next();
  }
}

module.exports = {
  userValidation,
};
