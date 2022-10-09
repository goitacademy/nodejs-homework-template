const { Contact } = require("../../models/contactModel");

const add = async (req, res) => {
  const body = req.query;
  body.favorite = !!body.favorite; // sets favorite to false if there is no value
  const contact = await Contact.create(body);
  res.status(201).json(contact);
};

module.exports = add;
