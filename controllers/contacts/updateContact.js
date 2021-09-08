const createError = require("http-errors");
const { contacts: service } = require("../../services");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.updateById(contactId, req.body);
  if (!result) {
    const error = createError(404, `Contact with id = ${contactId} not found`);
    throw error;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateContact;
