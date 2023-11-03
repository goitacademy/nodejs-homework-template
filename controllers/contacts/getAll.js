const operations = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await operations.listContacts();
  // res.json(contacts);
  res.json({
    status: "success",
    code: "200",
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
