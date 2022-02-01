const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;
