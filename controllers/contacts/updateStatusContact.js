const { Contact } = require("../../models/contacts");

const { createError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateStatusContact;
