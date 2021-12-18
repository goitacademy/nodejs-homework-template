const { NotFound } = require("http-errors");

const contactsOperations = require("../../model/contactsOperations");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContactById(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
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
