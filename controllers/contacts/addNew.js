const { Contact } = require("../../models/contact");

const addNew = async (req, res) => {
  const { _id: owner } = req.user;

  const newContact = {
    ...req.body,
    owner,
  };
  const result = await Contact.create(newContact);
  res.status(201).json(result);
};

module.exports = addNew;
