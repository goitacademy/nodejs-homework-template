// const createError = require("http-errors");
// const { NotFound } = require("http-errors");
// const {HttpError} = require('../helpers')

const { getContactById } = require("../models/contacts");

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      //   throw new NotFound("Not found");
      // throw createError(404, "Not found");

      // throw HttpError(404, "Not found")

      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContact;
