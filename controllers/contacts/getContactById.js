const createError = require("http-errors");
const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw createError(404, `Contact with id ${contactId} Not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};

module.exports = getContactById;
