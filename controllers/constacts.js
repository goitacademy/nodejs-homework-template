// const Joi = require("joi");

// const contacts = require("./constacts");
const {  TryCatchWrapper } = require("../utils");

const Contact = require("../models/contact");

// const validationSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

const getAll = async (req, res) => {
  const data = await Contact.find();
  res.json(data);
};

// const addContact = async (req, res) => {
//   const { error } = validationSchema.validate(req.body);
//   if (error) {
//     throw HTTPError(
//       400,
//       `missing required ${JSON.parse(error.message.split(" ")[0])} field`
//     );
//   }
//   const data = await contacts.addContact(req.body);
//   res.status(201).json(data);
// };

// const getById = async (req, res) => {
//   const { contactId } = req.params;
//   const data = await contacts.getContactById(contactId);
//   if (!data) {
//     throw HTTPError(404, "Not found");
//   }
//   res.json(data);
// };

// const deleteContact = async (req, res) => {
//   const { contactId } = req.params;
//   const data = await contacts.removeContact(contactId);
//   if (!data) {
//     throw HTTPError(404, "Not Found");
//   }
//   res.status(200).json({ message: "contact deleted" });
// };

// const changeContact = async (req, res) => {
//   const { error } = validationSchema.validate(req.body);
//   if (error) {
//     throw HTTPError(400, "missing fields");
//   }
//   const { contactId } = req.params;

//   const data = await contacts.updateContact(contactId, req.body);
//   if (!data) {
//     throw HTTPError(404, "Not found");
//   }
//   res.json(data);
// };

module.exports = {
  getAll: TryCatchWrapper(getAll),
  // getById: TryCatchWrapper(getById),
  // deleteContact: TryCatchWrapper(deleteContact),
  // changeContact: TryCatchWrapper(changeContact),
  // addContact: TryCatchWrapper(addContact),
};
