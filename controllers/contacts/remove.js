const Contact = require("../../models/contacts");

async function remove(req, res) {
  const { contactId } = req.params;
  try {
    const doc = await Contact.findByIdAndDelete(contactId).exec();

    if (doc === null) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}
module.exports = { remove };
