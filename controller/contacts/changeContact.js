const schema = require("../../schemas/Joi/contactStatusSchema");
const Contacts = require("../../models/contacts");

// change contact by Id
const changeContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    const { contactId } = req.params;
    const { _id } = req.user;

    // audit required fields
    if (error) {
      res.status(400).json({ message: error.message });
    }

    // audit contact by Id
    const contact = await Contacts.findOne({ _id: contactId, owner: _id });
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: _id },
      req.body
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = changeContact;
