const contacts = require("../../models/contacts");
const { createError } = require("../../helpers/createError");

async function updateContactById(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    throw createError({ status: 400, message: "Missing fields" });
  }
  const { id } = req.params;
  
  const result = await contacts.updateContactById(id, req.body);
  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }
  res.status(200).json(result);
}
module.exports = updateContactById;
