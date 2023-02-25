const contactOperations = require("../../models/");

const getAll = async (req, res, next) => {
  const result = await contactOperations.getAll();

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
