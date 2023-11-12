const Contact = require("../models/contact");
const {
  contactValidation,
} = require("../validation/contactsValidation");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next();
  }
  res.status(200).json(contact);
};
const createContact = async (req, res, next) => {
  try {
    const { error } = contactValidation.validate(req.body, {
      abortEarly: false,
    });
    if (typeof error !== "undefined") {
      return res
        .status(400)
        .send(error.details.map((err) => err.message).join(","));
    }
    const contact = await Contact.create(req.body);
    if (!contact) {
      res
        .status(400)
        .json({ message: "missing required name field" });
    }
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};
// const updateContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const { error } = contactValidation.validate(req.body, {
//       abortEarly: false,
//     });
//     if (typeof error !== "undefined") {
//       return res.status(400).json({ message: "missing fields" });
//     }
//     const contact = await updateContact(contactId, req.body);
//     if (!contact) {
//       return res.status(404).json({ message: "Not found" });
//     }
//     res.status(200).json(contact);
//   } catch (error) {
//     next(error);
//   }
// };
// const removeContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await removeContact(contactId);
//     if (!result) {
//       res.status(404).json({ message: "Not found" });
//     }
//     res.status(200).json({ message: "contact deleted" });
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports = {
  getAll,
  getById,
  createContact,
  //   updateContact,
  //   removeContact,
};
