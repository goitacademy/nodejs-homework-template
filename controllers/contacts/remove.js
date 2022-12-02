const { createError } = require("../../helpers");
const Contact = require("../../models/contacts");
const mongoose = require("mongoose");

async function remove(req, res) {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId))
    throw createError({
      status: 422,
      message: "Not valid Id, please provide correct contact id",
    });

  const contactDeleted = await Contact.findByIdAndRemove(contactId);

  if (!contactDeleted) {
    throw createError({ status: 404, message: "Not Found" });
  }

  res.json({
    status: "success",
    code: 200,
    message: `contact ${contactId} deleted`,
    data: contactDeleted,
  });
}

module.exports = remove;
