const { HttpError } = require("../helpers");

const validateBody = (Contact) => {
  const func = async (req, res, next) => {
    try {
      const contact = new Contact(req.body);
      await contact.validate();
      next();
    } catch (error) {
      next(HttpError(400, error.message));
    }
  };

  return func;
};

module.exports = validateBody;