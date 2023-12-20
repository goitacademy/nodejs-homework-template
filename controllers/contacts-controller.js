// import contactsService from "../models/Contact.js";
import {HttpError} from "../helpers/index.js";
import {contactAddShema, contactUpdateShema} from "../shemas/contact-shemas.js";
import {ctrlWrapper} from "../decorators/index.js";

import Contact from "../models/Contact.js";

const listContacts = async (req, res) => {
  //   const result = await contactsService.listContacts();
  const result = await Contact.find();
  res.json(result);
};

// const contactById = async (req, res) => {
//   const {contactId} = req.params;
//   const result = await contactsService.getContactById(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const addContact = async (req, res) => {
//   const result = await contactsService.addContact(req.body);
//   res.status(201).json(result);
// };

// const updateContact = async (req, res) => {
//   const {contactId} = req.params;
//   const result = await contactsService.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const removeContact = async (req, res) => {
//   const {contactId} = req.params;
//   const result = await contactsService.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({message: "contact deleted"});
// };

export default {
  listContacts: ctrlWrapper(listContacts),
  //   contactById: ctrlWrapper(contactById),
  //   addContact: ctrlWrapper(addContact),
  //   updateContact: ctrlWrapper(updateContact),
  //   removeContact: ctrlWrapper(removeContact),
};
