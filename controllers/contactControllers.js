const contactsMethods = require("../../models/contacts");

async function deleteContact(req, res, next) {
  const contactId = req.params.contactId;
  try {
    const result = await contactsMethods.removeContact(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  deleteContact,
};
