const contactsOperation = require("../../models/contacts");

const updateById = async (req, res, next) => {

  const { contactId } = req.params;
  const result = await contactsOperation.updateContact(contactId, req.body);

  if (!result) {
    res.json({
      status: "error",
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
    message: `${result.name} was updated successfully`,
  });
};

module.exports = updateById;
