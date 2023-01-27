const { contacts } = require("..");
const operations = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await operations.getAll();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
