const contactOperations = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const contact = await contactOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

module.exports = getAll;
