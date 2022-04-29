const { NotFound } = require("http-errors");
const contactsOperations = require("../../models");
const contactSchema = require("./contactSchema");

const updateContactById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const contact = await contactsOperations.updateContactById(
      contactId,
      req.body
    );
    if (!contact) {
      throw NotFound(`Contact with id=${contactId} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
