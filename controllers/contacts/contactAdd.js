// const { addContact } = require("../models");
const { Contact } = require("../../models/contact");

const contactAdd = async (req, res) => {
  const { _id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json(contact);
};

module.exports = contactAdd;
