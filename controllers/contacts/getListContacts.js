const { listContacts } = require("../../models/contacts");

const getListContacts = async (req, res) => {
  const products = await listContacts();

  res.json({
    status: "success",
    code: 200,
    data: {
      result: products,
    },
  });
};

module.exports = getListContacts;
