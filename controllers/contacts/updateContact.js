const contactsOperations = require("../../model/contacts");
const { contactJoiSchema } = require("../../validation");

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { contactId } = req.params;
    const updateContact = await contactsOperations.updateContact(contactId, req.body);
    if (!updateContact) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.json({
      updateContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
