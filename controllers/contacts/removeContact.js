const contactOperations = require("../../models/contacts");

const { NotFound } = require("http-errors");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactOperations.removeContact(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `contact id=${id} delete`,
    data: { result },
  });
};

module.exports = removeContact;
