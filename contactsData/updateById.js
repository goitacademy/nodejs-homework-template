const updateContacts = require('./updateContacts')
const listContacts = require('./getAll')

const updateContact = async (contactId, updateInfo) => {
    try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(item => String(item.id) === String(contactId));
        
        if (idx === -1) {
            return null;
        }

        contacts[idx] = { ...contacts[idx], ...updateInfo };

        await updateContacts(contacts)
        return contacts[idx]
    }
    catch (error) {
        throw error;
    }
}

module.exports = updateContact
