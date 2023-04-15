import mongoose from "mongoose";
import { Contact } from "./schemas/schema.js";
import { ObjectId } from "mongodb";

const getAllContacts = async () => Contact.find();

const getContactById = async (contactId) => Contact.findOne({ _id: contactId });

const removeContact = async (contactId) =>
  Contact.findByIdAndRemove({ _id: new ObjectId(contactId) });

const addContact = async (body) => Contact.create(body);

const updateContact = async (contactId, body) =>
  Contact.findByIdAndUpdate({ _id: new ObjectId(contactId) }, body, {
    new: true,
  });

const updateStatusContact = async (contactId, body) =>
  Contact.findOneAndUpdate(
    { _id: new ObjectId(contactId) },
    { favorite: body },
    {
      new: true,
    }
  );

export {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
