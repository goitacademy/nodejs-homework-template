const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactsOperations.getContactById(contactId);
  if (!contactById) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    data: {
      contactById,
    },
  });
};

module.exports = getById;
