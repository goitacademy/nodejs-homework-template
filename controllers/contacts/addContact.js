const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  //console.log(req.user);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = addContact;