const { BadRequest } = require("http-errors");
const contactsOperations = require("../../models/contacts.js");

async function updateContact(req, res) {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
  if (!result) {
    throw new BadRequest("missing fields");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = updateContact;
