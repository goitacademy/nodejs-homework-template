const contactsOperations = require("../../models/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      res.status(404).json(`Not found`);
    }
    res.status(200).json({
      result,
      message: `Contact deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
