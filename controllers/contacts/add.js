const contactsSchemas = require("../../schemas/contacts");

const Contact = require("../../models/contacts");

async function add(req, res, next) {
  const response = contactsSchemas.validate(req.body);
  if (typeof response.error !== "undefined") {
    return res.status(400).send({ message: "missing required name field" });
  } else {
    try {
      const { name, email, phone, favorite } = req.body;
      const newContact = {
        name: name,
        email: email,
        phone: phone,
        favorite: favorite,
      };
      const doc = await Contact.create(newContact);
      return res.send(doc);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { add };
