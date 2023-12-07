const schema = require('../validation/schema');

const validateFields = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  next();
};

module.exports = validateFields;
