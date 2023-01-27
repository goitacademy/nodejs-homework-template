const operations = require("../../model/contacts");

const getAll = async (req, res) => {
  const products = await operations.getAll();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: products,
    },
  });
};

module.exports = getAll;
