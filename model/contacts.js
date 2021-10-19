const Contact = require('./schemas/contact');

const getAllContacts = async () => {
    const results = await Contact.find({});
    return results;
};

const getContactById = async id => {
    const result = await Contact.findOne({ _id: id });
    return result;
};

const addContact = async ({ name, email, phone }) => {
    const result = await Contact.create(body);
    return result;
};

const updateContact = async (id, body) => {
    const result = await Contact.findByIdAndUpdate(
        { _id: id },
        { ...body },
        { new: true },
    );
    return result;
};

const removeContact = async id => {
    const result = await Contact.findByIdAndDelete({ _id: id });
    return result;
};

module.exports = {
    getAllContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
