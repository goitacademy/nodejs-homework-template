const checkContact = require('../units/contactsValidation');

const validateFields = (req, res, next) => {
  const { error } = checkContact.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  next();
};

module.exports = validateFields;
