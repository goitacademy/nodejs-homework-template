const createError = require("http-errors");
const contactsOperations = require("../../model/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw new createError(404, {
        message: `Contact with id=${id} not found`,
      });
    }
    res.status(200).json({ message: `Contact deleted` });
  } catch (error) {
    next(error);
  }
};
module.exports = removeContact;
