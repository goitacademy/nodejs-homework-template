const contactsOperations = require("../../model/contacts");
const { updateContactSchema } = require("../../validation");

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { contactId } = req.params;
    const updateContact = await contactsOperations.updateContact(
      Number(contactId) || contactId,
      req.body
    );
    if (!updateContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      data: { updateContact },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = updateContact;
