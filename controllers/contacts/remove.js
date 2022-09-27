const { NotFound } = require("http-errors");
const { contactsOperations } = require("../../models");

const remove = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} Not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    result,
  });
};

module.exports = remove;
