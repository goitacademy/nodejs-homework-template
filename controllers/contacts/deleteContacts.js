const contactsOperations = require("../../models/contacts");

const deleteContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      const error = new Error(`contact with id=${contactId} Not Found`);
      error.status = 404;
      throw error;
    }
    res.json({
      stutus: "success",
      code: 200,
      message: "contact deleted",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContacts;
