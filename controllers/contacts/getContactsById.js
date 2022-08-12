const contactsOperations = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      const error = new Error(`contact with id=${contactId} Not Found`);
      error.status = 404;
      throw error;
    }
    res.json({ status: "success", code: 200, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
