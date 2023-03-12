const contactsOperation = require("../../models/contacts");

const {
  createContactValidation,
  checkContactValidation,
} = require("../../utils");

const updateById = async (req, res, next) => {
  const { error } = createContactValidation(req.body);
  if (error) {
    checkContactValidation(req, res);
  }

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
