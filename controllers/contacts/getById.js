const createError = require("http-errors");
const contactsServices = require("../../services");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactsServices.getById(contactId);
  if (!contactById)
    throw createError(404, `Contact with ${contactId} id not found`);
  res.status(200).json({
    status: "success",
    code: "200",
    payload: { result: contactById },
  });
};

module.exports = getById;
