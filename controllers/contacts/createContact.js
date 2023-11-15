const { Contact } = require("../../models/contact/contact");

const { HttpError } = require("../../helpers");

const createContact = async (req, res) => {
  const { name } = req.body;
  const contact = await Contact.findOne({ name }).exec();
  console.log(contact);
  if (contact) {
    throw HttpError(409, "Contact already exists");
  }

  const result = await Contact.create(req.body);

  res.status(201).send(result);
};

module.exports = createContact;
