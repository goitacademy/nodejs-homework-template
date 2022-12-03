const { createError } = require("../../helpers");
const { getContactById } = require("../../models/contacts");

async function getById(req, res) {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (!contactById) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.json({
    status: "success",
    code: 200,
    data: contactById,
  });
}

module.exports = getById;
