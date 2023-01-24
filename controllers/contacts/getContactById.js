const contactOperations = require("../../models/contacts");

const { NotFound } = require("http-errors");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactOperations.getContactById(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = getContactById;
