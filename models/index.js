const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require("nanoid")

const contactsPath = path.join(__dirname, "contacts.json")
console.log(contactsPath)
const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))



const getAll = async () => {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data)
}

async function listContacts() {
    const contacts = await getAll()

    const contactsList = contacts.map(contact => contact.name)
    console.table(contactsList)
    return contactsList
}

const getById = async (id) => {
    const contacts = await getAll()
    const result = contacts.find(item => item.id === id)


    return result || null
}

const add = async ({ name, email, phone }) => {
    const newContact = {
        id: nanoid(),
        name, email, phone
    }
    const contacts = await getAll()
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    return newContact
}

const updateById = async (id, data) => {
    const contacts = await getAll()
    const index = contacts.findIndex(item => item.id === id)

    if (index === -1) { return null }

    contacts[index] = { id, ...data }
    console.log(contacts[index])
    await updateContacts(contacts)
    return contacts[index]
}

const removeById = async (id) => {
    const contacts = await getAll()
    const index = contacts.findIndex(item => item.id === id)

    if (index === -1) { return null }

    const result = contacts.splice(index, 1)
    console.log("result", result)
    await updateContacts(contacts)

    return result
}

module.exports = {
    getAll,
    listContacts,
    getById,
    add,
    updateById,
    removeById,
}