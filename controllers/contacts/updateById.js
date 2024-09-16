const { NotFound } = require("http-errors");
const { contactsOperations } = require("../../models");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  const result = await contactsOperations.updateContactById(contactId, body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} Not found`);
  }
  res.json({ status: "success", code: 200, result });
};

module.exports = updateById;
