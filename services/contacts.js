import { Contact } from "./schemas/schema.js";
import { ObjectId } from "mongodb";

const getAllContacts = async (id, page = 1, limit = Infinity, favorite) => {
  const paginationPage = Number(page) === 1 ? 0 : limit * page - limit;

  if (favorite !== undefined) {
    if (favorite === "true")
      return Contact.find({ owner: id }).sort({
        favorite: -1,
      });

    if (favorite === "false")
      return Contact.find({ owner: id }).sort({
        favorite: 1,
      });
  }

  return Contact.find({ owner: id }).skip(paginationPage).limit(limit);
};

const getContactById = async (contactId, id) =>
  Contact.find({ _id: contactId, owner: id });

const removeContact = async (contactId) =>
  Contact.findByIdAndRemove({ _id: new ObjectId(contactId) });

const addContact = async (body, id) => {
  return Contact.create({ ...body, owner: id });
};

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
