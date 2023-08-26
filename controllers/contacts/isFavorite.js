const Contact = require("../../models/contacts");
const contactsSchemas = require("../../schemas/contacts");

async function isFavorite(req, res, next) {
  try {
    const { favorite } = contactsSchemas.validate(req.body);

    const contactId = req.params.contactId;

    if (favorite === undefined) {
      return res.status(400).json({ message: "missing favorite field" });
    }
    const { name, email, phone } = req.body;
    const newContact = {
      name: name,
      email: email,
      phone: phone,
      favorite: favorite,
    };
    const doc = await Contact.findByIdAndUpdate(contactId, newContact, {
      new: true,
    }).exec();

    if (doc === null) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.send(doc);
  } catch (error) {
    next(error);
  }
}
module.exports = { isFavorite };
