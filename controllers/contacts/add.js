const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const body = req.body;

  const newContact = await Contact.create({ ...body, owner });
  res.status(201).json(newContact);
};

module.exports = add;
