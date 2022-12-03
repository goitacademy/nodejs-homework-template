const contactsOperations = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      res.status(404).json(` id=${contactId} not found`);
    }
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
