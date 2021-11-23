const { updateContact } = require("../../contacts");

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.json({ message: "missing fields", status: "failed", code: 400 });
  }

  const updatedContact = await updateContact(contactId, req.body);
  if (!updatedContact) {
    return res.json({
      message: "Not found",
      status: "failed",
      code: 404,
    });
  }
  return res.json({ updatedContact, status: "success", code: 200 });
};

module.exports = putContact;
