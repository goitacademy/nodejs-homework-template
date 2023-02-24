const fs = require('fs/promises')


const listContacts = async () => {
    try {
        const result = await fs.readFile('./models/contacts.json', 'utf8');
        return JSON.parse(result);
    } catch (err) {
        return err;
    }
}

const listContactById = async (contactId) => {
    try {
        const result = await listContacts()
        return await result.find(item => item.id === contactId);
    } catch (err) {
        return err;
    }
}

const postContact = async (body) => {
    try {
        const oldContacts = await listContacts();
        const newContacts = JSON.stringify([...oldContacts, body])
        await fs.writeFile('./models/contacts.json', newContacts, 'utf-8')
        return body
    } catch (err) {
        return err;
    }
}

const removeContact = async (contactId) => {
    try {
        const oldContacts = await listContacts();
        const isContact = oldContacts.find(item => item.id === contactId);
        if (isContact) {
            const newContacts = JSON.stringify(oldContacts.filter(item => item.id !== contactId));
            await fs.writeFile('./models/contacts.json', newContacts, 'utf-8')
            return {
                "statusCode": 200,
                "message": "contact deleted"
            };
        }
        ;
        return {
            "statusCode": 404,
            "message": "Not found"
        };

    } catch (err) {
        return err;
    }
}


const updateContact = async (contactId, body) => {
    try {
        const oldContacts = await listContacts();
        let newContact = null;
        const newContacts = await oldContacts.map(contact => {
            if (contact.id === contactId) {
                newContact = {...contact, ...body};
                return newContact
            }
            return contact
        })

        if (newContact) {
            await fs.writeFile('./models/contacts.json', JSON.stringify(newContacts), 'utf-8')
            return newContact;

        } else {
            return null
        }
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
}
