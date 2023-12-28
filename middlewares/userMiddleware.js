const { catchAsync, HttpError } = require("../utils");
const Contact = require("../models/contactModel");

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length < 21) throw new HttpError(400, "Invalid ID!");

  const contactById = await Contact.findById(id);

  if (!contactById) throw new HttpError(404, "Not found");

  req.contact = contactById;

  next();
});
