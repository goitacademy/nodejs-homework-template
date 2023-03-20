const Contact = require("./contactModel");

async function getContacts() {
    const contacts = await Contact.find({}).select("-__v");;
    return contacts;
  }

async function getContactById(contactId) {
    const contact = await Contact.findById({_id: contactId});
    return contact;
}

async function removeContact(contactId) {
    const deletedContact = await Contact.findOneAndRemove({ _id: contactId});
    return deletedContact;
}

async function addContact({ name, email, phone, favorite }) {
    const newContact = await Contact.create({name, email, phone, favorite});
    await newContact.save();
    return newContact;
}

const updateContact = async (contactId, { name, email, phone, favorite}) => {
    const contactsUpdate = await Contact.findByIdAndUpdate({ _id: contactId }, { name, email, phone, favorite}, { new: true });
    return contactsUpdate;
};

const updateStatusContact = async (contactId, {favorite }) => {
    const contactsUpdate = await Contact.findOneAndUpdate(
      { _id: contactId },
      { favorite },
      { new: true }
    );
    return contactsUpdate;
  };

module.exports = {
    getContactById,
    getContacts,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
}