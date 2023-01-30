const { NotFound } = require("http-errors");

const operations = require("../../models/contacts");

const removeContactByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await operations.removeById(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "product deleted",
    data: {
      result,
    },
  });
};

module.exports = removeContactByIdController;
