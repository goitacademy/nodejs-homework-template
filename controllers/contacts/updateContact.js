const { Contact } = require("../../models/contact-model/Contact");

const {
  validateContact,
} = require("../../models/contact-model/contactsValidator");

const updateContact = async (req, res, next) => {
  try {
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
