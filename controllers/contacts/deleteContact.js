const { Contact } = require("../../models/Contact");

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndRemove(req.params.contactId);
    if (contact) {
      res.json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
