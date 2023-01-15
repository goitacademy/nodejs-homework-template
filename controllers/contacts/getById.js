const { Contact } = require("../../models/contact");

const getBiId = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  console.log(contact);
  if (!contact) {
    const error = new Error(`There is no contacts with ID ${contactId}`);
    error.status = 404;
    throw error;
  }
  res.json({ status: "success", code: 200, data: { result: contact } });
};

module.exports = getBiId;
