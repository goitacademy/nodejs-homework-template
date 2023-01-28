const contactsOperations = require("../../models/contacts");
const contactSchema = require("../../models/contactSchema");

const putCont = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "Missing required name field";
      throw error;
    }
    const { contactId } = req.params;
    const contact = await contactsOperations.updateContact(contactId, req.body);
    if (!contact) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({ status: "success", code: 200, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = putCont;
