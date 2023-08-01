const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helpers');

// функция проверки валидности указанного ID
const isValidId = (req, res, next) => {
 const { contactId } = req.params;
 if (!isValidObjectId(contactId)) {
  next(HttpError(400, `${contactId} is not a valid ID`));
 }
 next();
};

module.exports = isValidId;
