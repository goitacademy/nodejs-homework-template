const { Contact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findOneAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) {
    throw new NotFound("Not found");
  }
  res.json(updateContact);
};

module.exports = updateById;
