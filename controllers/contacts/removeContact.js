const contactsOperations = require("../../services/contacts");
const createError = require("http-errors");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: "200",
      message: "contact deleted",
      removedContact: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
