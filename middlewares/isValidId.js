const { isValidObjectId } = require("mongoose");

const { NotFound } = require("http-errors");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;

  const isCorrectId = isValidObjectId(contactId);

  isCorrectId
    ? next()
    : next(NotFound(`${contactId} is not correct id format`));
};

module.exports = isValidId;
