const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts.js");

async function getContactById(req, res) {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = getContactById;
