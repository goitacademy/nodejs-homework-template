const { ctrlWrapper } = require("../../helpers");
const {
  ContactModel: { Contact },
} = require("../../models");

const addContact = async (req, res) => {
  const { _id: owner } = req.user; 
  const { body } = req;
  const result = await Contact.create({...body, owner});
  res.status(201).json(result);
};

module.exports = {
  addContact: ctrlWrapper(addContact),
};
