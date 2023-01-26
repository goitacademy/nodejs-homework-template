const { Contacts } = require("../../models/contact.js");
const { RequestError } = require("../../helpers/index.js");
const { contactSchema } = require("../../schemas/validationSchemaContact.js");

//  PATCH /api/contacts/:contactId/favorite

async function updateStatusContact(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const validationResult = contactSchema.validate({
      name,
      email,
      phone,
      favorite,
    });

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    if ({ name, email, phone, favorite } === null) {
      throw RequestError(400, "Missing field favorite");
    }

    const contactUpdateStatus = await Contacts.findOneAndUpdate(
      { _id: id },
      { favorite },
      { new: true }
    );
    if (!contactUpdateStatus) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(contactUpdateStatus);
    return contactUpdateStatus;
  } catch (error) {
    next(error);
  }
}

module.exports = updateStatusContact;
