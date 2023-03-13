const { Contact } = require("../../models/contacts");
const { createError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact(contactId);
    if (!result) {
      throw createError(404, "Not found ");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = getContactById;
