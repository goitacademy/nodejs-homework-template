const { NotFound } = require("http-errors");

const productsOperations = require("../../model/contacts");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsOperations.getById(id);
  if (!result) {
    throw new NotFound(`Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
