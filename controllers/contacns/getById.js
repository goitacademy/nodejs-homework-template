const contactOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.getContactById(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "seccess",
    code: 200,
    data: { result: result },
  });
};

module.exports = getById;
