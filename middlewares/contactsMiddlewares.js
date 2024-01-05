const { Types } = require("mongoose");
const Contact = require("../model/contactModel");

exports.checkContactsCreateValidat = async (req, res, next) => {
  //validation
  const { value, error } = shema.contactSchema(req.body);
  if (error) throw new HttpError(404, "invalid contact");
  // - проверяем есть ли такой contact
  const contactExists = await Contact.exists({ email: value.email });
  if (contactExists) throw new HttpError(409, "Contact you have");
  req.body = value;
  next();
};

exports.checkContactsGetId = async (req, res, next) => {
  const { contactId } = req.params;
  const idIsvalid = Types.ObjectId.isValid(contactId);
  if (!idIsvalid) throw new HttpError(404, "Invalid");
  const userExists = await Contact.findById(contactId);
  if (!userExists) throw new HttpError(404, "Invalid");
  console.log("miidlewars is work");
  next();
};
