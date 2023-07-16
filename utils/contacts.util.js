const { CONTACTS_PATH } = require('../constant');

const fsPromises = require('fs').promises;

async function readFileContacts() {
    try {
        const buffer = await fsPromises.readFile(CONTACTS_PATH)
        const listContact = JSON.parse(buffer)

        return listContact
    } catch (e) {
        return []
    }
}

async function writeFileContacts(list) {
    try {
        const listAsString = JSON.stringify(list)
        await fsPromises.writeFile(CONTACTS_PATH, listAsString)

        return listAsString
    } catch (e) {
        throw new Error('Something went wrong while write to file')
    }
}

module.exports = {
    readFileContacts,
    writeFileContacts
}