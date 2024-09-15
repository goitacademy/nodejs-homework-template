const { Contact } = require("../database/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactByID = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }
  
  return contact;
};

const addContact = async (data) => {
  const newContact = new Contact(data);
  await newContact.save();
  return newContact;
};

const deleteContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }

  await Contact.findByIdAndRemove(contactId);
};

const changeContactById = async (contactId, body) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }

  await Contact.findByIdAndUpdate(contactId, body);
};

const patchContactById = async (contactId, body) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }

  await Contact.findByIdAndUpdate(contactId, {
    $set: body,
  });
};

const patchFavoriteContactById = async (contactId, body) => {
    const contact = await Contact.findById(contactId);

    if(!contact) {
        throw new WrongParametersError(`Contact with id '${contactId}' not found`);
    }

    await Contact.findByIdAndUpdate(contactId, {
        $set: body,
    });
};

const updateStatusContact = async (contactId, body) => {
    const contact = await Contact.findById(contactId);

    if(!contact) {
        throw new WrongParametersError(`Contact with id '${contactId}' not found`);
    }

    await Contact.findByIdAndUpdate(contactId, body);
};

module.exports = {
    getContacts,
    getContactByID,
    addContact,
    deleteContactById,
    changeContactById,
    patchContactById,
    patchFavoriteContactById,
    updateStatusContact,
}
