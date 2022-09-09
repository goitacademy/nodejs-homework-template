const { Contacts } = require("../db/contactsModel");
const { ContactsBookError, ValidationError } = require("../helpers/errors");

const listContacts = async (owner) => {
  const contacts = await Contacts.find({ owner });
  return contacts;
};

const getContactById = async (owner, id) => {
  const contactId = String(id);
  const result = await Contacts.findOne({ _id: contactId, owner });
  if (!result) {
    throw new ContactsBookError("Not Found");
  }
  return result;
};

const addContact = async (owner, body) => {
  const isAddedBefore = await Contacts.findOne({ phone: body.phone });
  if (!body.name || !body.email || !body.phone) {
    throw new ValidationError("missing required field");
  }
  if (isAddedBefore) {
    throw new ValidationError(
      `contact with phone ${body.phone} was added before`
    );
  }

  const contact = new Contacts({ ...body, owner });
  await contact.save();
  return contact;
};

const removeContact = async (owner, id) => {
  const contactId = String(id);
  const contactById = await Contacts.findOne({ _id: contactId, owner });

  if (!contactById) {
    throw new ContactsBookError("Not Found");
  }
  await Contacts.findOneAndRemove({ owner, contactId });
};

const updateContact = async (owner, id, body) => {
  const contactId = String(id);

  if (!body) {
    throw new ValidationError("missing fields");
  } else {
    await Contacts.findByIdAndUpdate(
      {
        _id: contactId,
        owner,
      },
      { ...body }
    );
    const updated = await Contacts.findOne({ _id: contactId, owner });
    return updated;
  }
};

const updateStatusContact = async (owner, id, body) => {
  const contactId = String(id);

  if (!body) {
    throw new ValidationError("missing field favorite");
  }

  await Contacts.findByIdAndUpdate(
    {
      _id: contactId,
      owner,
    },
    { ...body }
  );
  const updated = await Contacts.findOne({ _id: contactId, owner });
  return updated;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
