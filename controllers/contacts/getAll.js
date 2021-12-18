const contactsOperations = require("../../model/contactsOperations");

const getAll = async (req, res) => {
  const result = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
