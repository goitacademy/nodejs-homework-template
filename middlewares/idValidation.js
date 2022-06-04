const mongoose = require('mongoose');

const idValidation = () => {
  return (req, res, next) => {
    const { contactId } = req.params;
    const isError = !mongoose.Types.ObjectId.isValid(contactId);

    if (isError) {
      const error = new Error(`Contact id=${contactId} is not valid`);
      error.status = 404;
      next(error);
    }
    next();
  };
};

module.exports = idValidation;
