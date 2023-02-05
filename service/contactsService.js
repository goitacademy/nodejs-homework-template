const Contact = require('./schemas/contacts');

const listContacts = async ({ _id, skip, limit, favorite }) => {

  if(!favorite) {
    return await Contact.find(
      { owner: _id }, "-updatedAt -createdAt", { skip, limit: Number(limit) }
    ).populate("owner", "_id email");
  } else {
    return await Contact.find(
      { owner: _id, favorite }, "-updatedAt -createdAt", { skip, limit: Number(limit) }
    ).populate("owner", "_id email");
  }
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findOne({ _id: contactId });
  return contactById;
};

const removeContact = async (contactId) => {
  const contactDeleted = await Contact.findOneAndRemove({ _id: contactId});
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

const updateContact = async (contactId, body) => {
  const contactUpdated = await Contact.findOneAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  );

  return contactUpdated;
};

const updateContactStatus = async (contactId, body) => {
  const contactUpdateStatus = await Contact.findOneAndUpdate(
    { _id: contactId },
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