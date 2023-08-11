const contactsOperations = require("../../models/contacts");
const contactSchema = require("../../shemas/contacts");

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;

    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error("Not found contact");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
