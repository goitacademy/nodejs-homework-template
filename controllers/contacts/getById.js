const { createError } = require("../../helpers");
const Contact = require("../../models/contacts");
const mongoose = require("mongoose");

async function getById(req, res) {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId))
    throw createError({
      status: 422,
      message: "Not valid Id, please provide correct contact id",
    });

  const contactById = await Contact.findById(contactId).exec();
  console.log(contactById);

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

// function (
//   err,
//   data
// ) {
//   console.log("ERRROR", err);
//   console.log("DATTTA", data);

//   if (err) {
//     throw createError({ status: 404, message: "Not found" });
//   }

//   res.json({
//     status: "success",
//     code: 200,
//     data: data,
//   });
// }
