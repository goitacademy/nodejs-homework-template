const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactsOperations.getContactById(contactId);
  if (!contactById)
    throw createError(404, `Contact with ${contactId} id not found`);
  res.status(200).json({
    status: "success",
    code: "200",
    data: { result: contactById },
  });
};

module.exports = getById;
