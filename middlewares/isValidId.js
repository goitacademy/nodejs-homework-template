// міделвара перевірки id на валідність

const { isValidObjectId } = require("mongoose"); // імпортуємо функцію з mongoose

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
   if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not a valid id`));
  }
  next();
};

module.exports = isValidId;

