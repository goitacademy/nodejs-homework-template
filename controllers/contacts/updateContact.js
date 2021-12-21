const createError = require("http-errors");
const contactsOperations = require("../../model/contacts");

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.updateContact(id, req.body);
    if (!result) {
      throw new createError(404, {
        message: `Contact with id=${id} not found`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateContact;
