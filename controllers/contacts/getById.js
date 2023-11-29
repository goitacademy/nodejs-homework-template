const contactOperation = require("../../models/contacts");

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactOperation.getContactById(contactId);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(result);
};

module.exports = getById;
