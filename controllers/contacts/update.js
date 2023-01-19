const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const update = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;
  const updatedContact = await contactsOperations.updateContact(id, body);
  if (!updatedContact) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: updatedContact,
    },
  });
};

module.exports = update;
