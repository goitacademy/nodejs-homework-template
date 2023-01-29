const operations = require("../../models/contacts");

const getContactsList = async (req, res) => {
  const contacts = await operations.getAll();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getContactsList;
