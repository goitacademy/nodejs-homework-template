import { Request } from "express";
import { Contact } from "../model";
import { IContact } from "../helpers";

const getAll = async (ownerId: string, req: Request) => {
  const query = req.query;

  if (
    "favorite" in query &&
    (query.favorite === "true" || query.favorite === "false")
  ) {
    return await Contact.find({
      owner: ownerId,
      favorite: query.favorite,
    }).populate("owner", "email");
  }

  if ("page" in query && "limit" in query) {
    const skip = Number(query.page as string);
    const limit = Number(query.limit as string);

    return await Contact.find(
      { owner: ownerId },
      "_id name email phone owner",
      { skip, limit }
    ).populate("owner", "email subscription");
  }

  return await Contact.find({ owner: ownerId }).populate(
    "owner",
    "email subscription"
  );
};

const getById = async (ownerId: string, contactId: string) =>
  await Contact.findById({ owner: ownerId, _id: contactId }).populate(
    "owner",
    "email subscription"
  );

const post = async (contact: IContact) => {
  const newContact = await new Contact(contact);

  await newContact.save();

  return newContact;
};

const update = async (
  ownerId: string,
  contactId: string,
  contact: IContact
) => {
  const newContact = await Contact.findOneAndUpdate(
    { owner: ownerId, _id: contactId },
    {
      $set: contact,
    },
    { new: true }
  );

  return newContact;
};

const updateStatus = async (
  ownerId: string,
  contactId: string,
  favorite: boolean
) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { owner: ownerId, _id: contactId },
    { favorite },
    { new: true }
  );

  return updatedContact;
};

const deleteById = async (ownerId: string, contactId: string) => {
  const contact = await Contact.findOneAndRemove({
    owner: ownerId,
    _id: contactId,
  });

  return contact;
};

export { getAll, getById, post, update, updateStatus, deleteById };
