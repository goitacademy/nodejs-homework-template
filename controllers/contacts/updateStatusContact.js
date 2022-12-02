const Contact = require("../../models/contacts");
const { createError } = require("../../helpers");
const mongoose = require("mongoose");

async function updateStatusContact(req, res) {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId))
    throw createError({
      status: 422,
      message: "Not valid Id, please provide correct contact id",
    });

  console.log(req.body);
  const response = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log(response);
  if (!response) {
    throw createError({ status: 404, message: "Not Found" });
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact status updated",
    data: response,
  });
}

module.exports = updateStatusContact;
