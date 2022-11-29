const { createError } = require("../../helpers");
const { updateContact } = require("../../models/contacts");

async function update(req, res) {
  const { contactId } = req.params;
  const response = await updateContact(contactId, req.body);
  if (!response) {
    throw createError({ status: 404, message: "Not Found" });
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact updated",
    data: response,
  });
}

module.exports = update;
