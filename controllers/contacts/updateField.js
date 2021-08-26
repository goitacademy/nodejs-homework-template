const { contacts: service } = require("../../services");
const createError = require("http-errors");

const updateField = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.updateStatusContact(contactId, req.body);
  if (!req.body) {
    const error = createError(400, "Missing field favorite");
    throw error;
  }
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

module.exports = updateField;
