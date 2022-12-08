const { nanoid } = require("nanoid")

const contacts = require("./contactsOper")
// const Contact = require("../../models/contactModel")

const getAll = async () => {
    const result = await contacts.find()

    console.log("data", result)
    return result
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

    return newContact
}

const updateById = async (id, data) => {
    const contacts = await getAll()
    const index = contacts.findIndex(item => item.id === id)

    if (index === -1) { return null }

    contacts[index] = { id, ...data }
    console.log(contacts[index])
    return contacts[index]
}

const removeById = async (id) => {
    const contacts = await getAll()
    const index = contacts.findIndex(item => item.id === id)

    if (index === -1) { return null }

    const result = contacts.splice(index, 1)
    console.log("result", result)

    return result
}

// module.exports = {
//     getAll,
//     listContacts,
//     getById,
//     add,
//     updateById,
//     removeById,
// }