const contactOperations = require("../../models/contacts");

const getAll = async (req, res) => {
  const allContact = await contactOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: allContact,
    },
  });
};

module.exports = getAll;
