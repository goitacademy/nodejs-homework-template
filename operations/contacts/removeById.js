const contactsOperations = require("../../models/contacts");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsOperations.removeContact(contactId);
    if (!removedContact) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
