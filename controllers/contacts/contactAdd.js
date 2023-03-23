// const { addContact } = require("../models");
const { Contact } = require("../../models/contact");

const contactAdd = async (req, res) => {
  const contact = await Contact.create(req.body);

  res.status(201).json(contact);
};

module.exports = contactAdd;
