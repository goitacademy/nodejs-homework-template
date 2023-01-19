const schema = require("../../schemas/schemas");
const Contacts = require("../../models/contacts");

// change contact by Id
const changeContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.query);
    const { contactId } = req.params;

    // audit required fields
    if (error) {
      res.status(400).json({ message: error.message });
    }

    // audit contact by Id
    const contact = await Contacts.findById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    const updatedContact = await Contacts.findOneAndUpdate(
      contactId,
      req.query
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = changeContact;
