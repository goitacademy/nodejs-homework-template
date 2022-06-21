const { Contact } = require("../../models/contacts");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findOneAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(updateContact);
};

module.exports = updateById;
