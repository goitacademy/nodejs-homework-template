const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const { Contact } = require("../models");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  console.log(result);
  if (!result) {
    res.status(400);
    throw new Error("Controller: Unnable to fetch contacts");
  }
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
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
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
