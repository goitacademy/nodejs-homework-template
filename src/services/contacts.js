import { ContactsCollection } from "../models/contacts.js";
import { SORT_ORDER } from "../constants/index.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

async function getContacts({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
  filter = {},
  userId,
}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactQuery.where("contactType").equals(filter.contactType);
  }

  if (typeof filter.isFavourite !== "undefined") {
    contactQuery.where("isFavourite").equals(filter.isFavourite);
  }
  contactQuery.where("userId").equals(userId);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
}

function getContactById(contactId, userId) {
  return ContactsCollection.findOne({
    _id: contactId,
    userId,
  });
}

function createContact(contact) {
  return ContactsCollection.create(contact);
}

function deleteContact(contactId) {
  return ContactsCollection.findOneAndDelete({ _id: contactId });
}

async function changeContact(contactId, name, userId) {
  return ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { name },
    { new: true }
  );
}
export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {}
) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
export {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  changeContact,
};
