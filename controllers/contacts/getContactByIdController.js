const { NotFound } = require("http-errors");

const operations = require("../../models/contacts");

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await operations.getById(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactByIdController;
