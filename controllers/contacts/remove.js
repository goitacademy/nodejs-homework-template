const createError = require("http-errors");
const { contactsServices } = require("../../services");

const remove = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contactToRemove = await contactsServices.remove(_id, contactId);
  if (!contactToRemove)
    throw createError(404, `Contact with ${contactId} id not found`);
  res.status(200).json({
    status: "success",
    code: "200",
    message: "contact deleted",
  });
};

module.exports = remove;
