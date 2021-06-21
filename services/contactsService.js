import Contact from '../db/contactsModel.js';

const getContacts = async () => {
    return await Contact.find({});
};

const getContactById = async contactId => {
    return await Contact.findById(contactId);
};

const deleteContact = async contactId => {
    await Contact.findByIdAndRemove(contactId);
};

const addContact = async ({ name, email, phone }) => {
    const newContact = new Contact({
        name,
        email,
        phone,
    });
    await newContact.save();
    return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
    const contact = await getContactById(contactId);
    const newContact = {
        name: name || contact.name,
        email: email || contact.email,
        phone: phone || contact.phone,
    };
    await Contact.findByIdAndUpdate(contactId, { $set: newContact });
};

const updateStatusContact = async (contactId, newStatus) => {
    const contact = await getContactById(contactId);
    await Contact.findByIdAndUpdate(contactId, {
        $set: (contact.favorite = newStatus),
    });
};

export {
    getContacts,
    getContactById,
    deleteContact,
    addContact,
    updateContact,
    updateStatusContact,
};
