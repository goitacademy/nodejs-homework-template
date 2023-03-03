const contactOperations = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await contactOperations.listContacts();

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = { getAll };
