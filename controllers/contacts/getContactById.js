const createError = require("http-errors");

const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw createError(404, `Contact with id '${contactId}' not found`);
  }
  res.status(200).json({
    status: "seccess",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;
