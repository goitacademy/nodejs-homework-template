const { createError } = require("../../helpers");
const { removeContact } = require("../../models/contacts");

async function remove(req, res) {
  const { contactId } = req.params;
  const contactDeleted = await removeContact(contactId);

  if (!contactDeleted) {
    throw createError({ status: 404, message: "Not Found" });
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: contactDeleted,
  });
}

module.exports = remove;
