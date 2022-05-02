const { Contact } = require("../../models");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contacts = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contacts) {
    const error = new Error(`Not found ${contactId}`);
    error.status = 404;
    throw error;
  }
  res
    .status(200)
    .json({ status: "success", code: 200, data: { result: contacts } });
};

module.exports = updateContact;
