const { ctrlWrapper } = require("../utils");

const {Contact} = require("../models/contact/contact");

// const Joi = require("joi");

// const  {contacts}  = require("../models/contacts");

const { HttpError } = require("../helpers");

// const addSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     phone: Joi.string().required(),
//   });

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};



// const listContacts = async (req, res, next) => {
//   try {
//     const result = await contacts.list();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const getContactById = async (req, res, next) => {
//     const { contactId } = req.params;
//     const result = await contacts.getById(contactId);
//     if (!result) {
//       throw HttpError(404, `Contact with ${contactId} not found`);
//     }
//     res.json(result);

// };

// const addContact = async (req, res, next) => {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contacts.add(req.body);
//     res.status(201).json(result);

// };

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);

};

// const removeContact = async (req, res, next) => {

//     const { contactId } = req.params;
//     const result = await contacts.remove(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({ message: "contact deleted" });

// };

// const updateContact = async (req, res, next) => {

//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { contactId } = req.params;
//     const result = await contacts.update(contactId, req.body);
//     res.json(result);

// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  //   getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
  //   removeContact: ctrlWrapper(removeContact),
  //   updateContact: ctrlWrapper(updateContact),
};
