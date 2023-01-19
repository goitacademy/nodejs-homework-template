const Contacts = require("../../models/contacts");
const contactStatusSchema = require("../../schemas/schemas");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactStatusSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing field favorite" });
    }

    const { contactId } = req.params;
    const contact = await Contacts.findById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    const updatedContact = await Contacts.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
