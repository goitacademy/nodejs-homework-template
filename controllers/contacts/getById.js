const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await contactsOperations.getContactById(contactId);
    if (!contacts) {
      throw createError(404, `Contacts with ${contactId} not found`);
    }
    return res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
