const { Contacts } = require("../../models/contact.js");
const { RequestError } = require("../../helpers/index.js");
const { contactSchema } = require("../../schemas/validationSchemaContact.js");

// PUT /api/contacts/:id

async function updateContactById(req, res, next) {
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
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await Contacts.findOneAndUpdate(
      { _id: id },
      {
        name,
        email,
        phone,
        favorite,
      },
      { new: true }
    );
    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(contactUpdate);
    return contactUpdate;
  } catch (error) {
    next(error);
  }
}

module.exports = updateContactById;
