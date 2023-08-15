const {validateContact, handleMissingFields} = require('../../middleware/validationMiddleware')
const { updateContact } = require("../../models/contacts");


const editById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      res.json({
        message: "Not found"
      });
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = [handleMissingFields, validateContact, editById];