const contactsOperations = require("../../models/contacts");
const contactSchema = require("../../models/contactSchema");

const addCont = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "Missing required name field";
      throw error;
    }

    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = addCont;
