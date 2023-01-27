const contactsOperations = require("../../routes/api/contacts");

const getAll = async (req, res, next) => {
  const contacts = await contactsOperations.getAll();
  res.json({ status: "success", code: 200, data: { result: contacts } });
};

module.exports = getAll;
