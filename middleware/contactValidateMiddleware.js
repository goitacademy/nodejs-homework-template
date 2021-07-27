const { contact } = require('../model/schemas');
const { validateContact } = contact;

const contactValidateMiddleware = (req, res, next) => {
  const error = validateContact(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    });
    return;
  }
  next();
};

module.exports = contactValidateMiddleware;
