const createError = require("http-errors");
const contactsOperations = require("../../model/contacts");

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await contactsOperations.getContactById(id);
    if (!contactById) {
      throw new createError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
};
module.exports = getContact;
