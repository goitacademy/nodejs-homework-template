const { Contact } = require("../../models/contact-model/Contact");

const deleteContact = async (req, res, next) => {
  try {
      const contact = await Contact.findByIdAndRemove({
        _id: req.params.contactId,
        owner: req.user.id,
      });
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
