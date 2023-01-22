const contactOperations = require("../../models");
const createError = require("http-errors");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactOperations.removeContactById(contactId);
  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = deleteContact;
