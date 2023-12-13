const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const addContact = async (req, res) => {
  result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = {
    addContact: ctrlWrapper(addContact),
}