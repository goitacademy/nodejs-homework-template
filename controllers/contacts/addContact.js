const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const addContact = async (req, res) => {
  const { _id: owner} = req.user;
  result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
    addContact: ctrlWrapper(addContact),
}