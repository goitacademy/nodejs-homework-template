const {Contacts} = require('../db/contactsModel');

const listContacts = async () => {
    try {
        const data = await Contacts.find({})
        return data
    } catch (err) {
        return err;
    }
}

const listContactById = async (contactId) => {
    try {
        const data = await Contacts.findById(contactId)
        return data
    } catch (err) {
        return err;
    }
}

const postContact = async (body) => {
    try {
        return Contacts.create(body)
    } catch (err) {
        return err;
    }
}

const removeContact = async (contactId) => {
    try {
        const contact = await Contacts.findByIdAndRemove(contactId);
        if (!contact) {
            return {"message": "Not found"};
        }
        return {"message": "contact deleted"};
    } catch (err) {
        return err;
    }
}

const updateContact = async (contactId, body) => {
    try {
        return Contacts.updateOne({_id: contactId}, body);
    } catch (err) {
        return err;
    }
}

const updateFavorite = async (contactId, body) => {
    try {
        return Contacts.updateOne({_id: contactId}, body);
    } catch (err) {
        return err;
    }
}


module.exports = {
    listContacts,
    listContactById,
    postContact,
    removeContact,
    updateContact,
    updateFavorite,
}
