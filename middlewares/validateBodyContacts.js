const { HttpError } = require('../helpers');

const validateBodyContacts = joiSchema => {
  const func = (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) next(HttpError(400, 'Missing fields'));
    else next();
  };

  return func;
};

module.exports = {
  validateBodyContacts,
};
