const Contact = require('./schemas/contacts');

const listContacts = async ({ _id, skip, limit, favorite }) => {
  const filters = favorite ? { owner: _id, favorite } : { owner: _id };

  const allContacts = await Contact.find(
    filters, "-updatedAt -createdAt", { skip, limit: Number(limit) }
  ).populate("owner", "_id email");
  return allContacts;
};

const getContactById = async (contactId, userId) => {
  const contactById = await Contact.findOne({  owner: userId, _id: contactId });
  return contactById;
};

const removeContact = async (contactId, userId) => {
  const contactDeleted = await Contact.findOneAndRemove({ owner: userId, _id: contactId});
  return contactDeleted;
};

const addContact = async ({ name, email, phone, _id }) => {
  const newContact = await Contact.create({
    name: name,
    email: email,
    phone: phone,
    owner: _id,
  });

  return newContact;
};

const updateContact = async (contactId, body, userId) => {
  const contactUpdated = await Contact.findOneAndUpdate(
    { owner: userId, _id: contactId },
    body,
    { new: true }
  );

  return contactUpdated;
};

const updateContactStatus = async (contactId, body, userId) => {
  const contactUpdateStatus = await Contact.findOneAndUpdate(
    { owner: userId, _id: contactId },
    { favorite: body },
    { new: true }
  );

  return contactUpdateStatus;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
}