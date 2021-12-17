const contactOperations = require("../../model");

const getAll = async (req, res) => {
  const result = await contactOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
