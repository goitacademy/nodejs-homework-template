const { Contact } = require("../../models/contact");

const getBiId = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({ status: "success", code: 200, data: { result: contact } });
};

module.exports = getBiId;
