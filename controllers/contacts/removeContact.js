const { Contact } = require("../../models");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw createError(404, `Contact with id ${contactId} Not found`);
  }
  res.json({
    status: "success",
    code: 200,
    messages: "contact deleted",
    data: {
      result: result,
    },
  });
};

module.exports = removeContact;
