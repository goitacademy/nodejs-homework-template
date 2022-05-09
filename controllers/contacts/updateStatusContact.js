const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!contact) {
    throw NotFound(`Contact with id=${contactId} not found`);
  }
  res.json(contact);
};

module.exports = updateStatusContact;
