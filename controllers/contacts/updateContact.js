const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, `Contact with id="${contactId}" not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
