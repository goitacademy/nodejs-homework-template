const { Contact } = require("../db/contactsModel");

const getContact = async () => Contact.find({});

const getContactById = (id) => Contact.findById(id);

const addContact = async ({ name, email, phone, favorite }) => {
    const contact = new Contact({ name, email, phone, favorite });
    await contact.save();
    return contact;
};

const removeContact = (id) => Contact.findByIdAndRemove(id);

const updateContact = async ({ name, email, phone }, id) => {
    await Contact.findByIdAndUpdate(id, {
        $set: { name, email, phone },
    });

    return Contact.findById(id);
};

const updateContactStatus = async (id, { favorite }) => {
    console.log(favorite, id);
    await Contact.findByIdAndUpdate(id, {
        $set: { favorite },
    });

    const contact = await Contact.findById(id);
    return contact;
};

module.exports = {
    getContact,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateContactStatus,
};