const contactOperation = require("../../models/contacts");

const changeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactOperation.updateContact(contactId, req.body);
  console.log(result);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(result);
};

module.exports = changeById;
