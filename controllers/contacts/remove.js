const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsOperations.removeContact(contactId);
    if (!removedContact) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: removedContact,
      },
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
