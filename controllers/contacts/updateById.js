const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contactsFunctions");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateById(contactId, req.body);
  if (!result) {
    throw NotFound(`Contact with id = ${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;
