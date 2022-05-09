const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw NotFound(`Contact with id=${contactId} not found`);
  }
  res.json(contact);
};

module.exports = updateContactById;
