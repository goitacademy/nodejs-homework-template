const validateContact = require('./validation');

const addContactValidation = async (req, res, next) => {
  const requiredFields = ['name', 'email', 'phone'];

  const {error} = validateContact(req.body, requiredFields);

  if (error) {
    const {message} = error.details[0];
    return res.status(400).json({message});
  }

  next();
};

const updateContactValidation = async (req, res, next) => {
  const {error} = validateContact(req.body);
  const {contactId} = req.params;

  if (error) {
    const {message} = error.details[0];
    return res.status(400).json({message});
  }

  if (contactId === void 0) {
    return res.status(403).json({message: 'Not found'});
  }

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
};
