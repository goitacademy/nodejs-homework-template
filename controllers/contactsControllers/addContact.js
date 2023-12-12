const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner }).populate("owner", "name email");
  res.status(201).json(result);
};

module.exports = {
  addContact: ctrlWrapper(addContact),
};
