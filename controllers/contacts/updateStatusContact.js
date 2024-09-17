const { ctrlWrapper } = require("../../helpers");

const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.status(201).json(result);
};

module.exports = { updateStatusContact: ctrlWrapper(updateStatusContact) };