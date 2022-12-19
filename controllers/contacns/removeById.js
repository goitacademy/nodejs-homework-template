const contactOperations = require("../../models/contacts");

const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.removeContact(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: { result },
  });
};

module.exports = removeById;
