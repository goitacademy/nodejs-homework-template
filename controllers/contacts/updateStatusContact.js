// const db = require("../models/contacts");
const { HttpError } = require("../../utils/httpError");
const { contactUpdateStatusSchema } = require("../../utils/validation");
const { Contact } = require("../../models/model");

async function updateStatusContact(req, res, next) {
  try {
    const { error } = contactUpdateStatusSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "Missing required name field"));
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      return next(HttpError(404, "Not found"));
    }

    res.json(result);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = updateStatusContact;
