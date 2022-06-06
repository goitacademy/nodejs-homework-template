const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite = null } = req.body;
  if (favorite === null) {
    const error = new Error("missing field favorite");
    error.status = 400;
    throw error;
  }
  const updContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!updContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(updContact);
};

module.exports = updateStatusContact;
