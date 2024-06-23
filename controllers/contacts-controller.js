import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Contact from "../models/Contact.js";

async function getAllContacts(req, res, next) {
  const contacts = await Contact.find();
  if (contacts) {
    res.json(contacts);
  } else {
    throw HttpError(404, "No contacts found");
  }
}

async function getContactsById(req, res, next) {
  const id = req.params.contactId;
  const contactById = await Contact.findById(id);
  if (contactById) {
    res.json(contactById);
  } else {
    throw HttpError(404, "Contact not found");
  }
}

async function addNewContact(req, res, next) {
  const newContact = await Contact.create(req.body);
  console.log(newContact);
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const id = req.params.contactId;
  const deleteContact = await Contact.findByIdAndDelete(id);
  console.log(deleteContact);
  if (deleteContact) {
    res.json({ message: "contact deleted", status: 200 });
  } else {
    throw HttpError(404);
  }
}

async function editContact(req, res, next) {
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
}

async function updateContact(req, res, next) {
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
}

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  editContact: ctrlWrapper(editContact),
  updateContact: ctrlWrapper(updateContact),
};