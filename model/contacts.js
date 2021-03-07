const Contact = require("./schema/schema-contacts");

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

async function listContacts(userId) {
  const results = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "name email sex -_id",
  });
  return results;
}

async function getContactById(contactId, userId) {
  const result = await Contact.find({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email sex -_id",
  });
  return result;
}

async function removeContact(contactId, userId) {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
