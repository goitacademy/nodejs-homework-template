const { Types } = require("mongoose");
const Contact = require("../model/contactModel");
const { HttpError } = require("../Helpers/HttpError");
const { contactSchema } = require("../Shema/shema");

exports.checkContactsCreateValidat = async (req, res, next) => {
  //validation
  const { value, error } = contactSchema.validate(req.body);
  if (error) res.status(404).json(error);
  // - проверяем есть ли такой contact
  const contactExists = await Contact.exists({ email: value.email });
  if (contactExists) req.body = value;
  next();
};

exports.checkContactsGetId = async (req, res, next) => {
  const { contactId } = req.params;
  const idIsvalid = Types.ObjectId.isValid(contactId);
  if (!idIsvalid) throw HttpError(404, "Invalid");
  const userExists = await Contact.findById(contactId);
  if (!userExists) throw HttpError(404, "Invalid");
  console.log("miidlewars is work");
  next();
};
