const contactsSchemas = require("../../schemas/contacts");
const Contact = require("../../models/contacts");

async function update(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const response = contactsSchemas.validate(req.body);
    if (typeof response.error !== "undefined") {
      return res.status(400).send({ message: "missing required name field" });
    }
    const { name, email, phone, favorite } = req.body;
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
module.exports = { update };
