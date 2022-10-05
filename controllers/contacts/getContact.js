const contactsMethods = require("../../models/contacts")
const { RequestError } = require("../../helpers")

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsMethods.getContactById(contactId);
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(contact);
}

module.exports = getContact;