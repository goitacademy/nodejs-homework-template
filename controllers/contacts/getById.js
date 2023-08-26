const Contact = require("../../models/contacts");

async function getById(req, res, next) {
  const { contactId } = req.params;

  try {
    const doc = await Contact.findById(contactId).exec();
    if (doc === null) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (doc.owner._id.toString() !== req.user.id) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.send(doc);
  } catch (error) {
    next(error);
  }
}
module.exports = { getById };
