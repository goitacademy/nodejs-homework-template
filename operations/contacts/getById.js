const contactsOperations = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
