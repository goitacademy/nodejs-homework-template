const { Contact } = require("../../models/contact");

const postContact = async (req, res, next) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({ newContact });
};

module.exports = postContact;
