const Contacts = require("../models/contactsModel");
const cathAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.checkContactId = cathAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contactExists = await Contacts.exists({ _id: contactId });

  if (!contactExists) throw new AppError(404, "User does not exist..2");

  //   if (!contactExists) {
  // res.status(404).json({ message: "Not found" });
  // return;
  //   }

  next();
});
