const { Contact } = require("../../models");
const createError = require("http-errors");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  // const { name, email, phone } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = updateContact;
