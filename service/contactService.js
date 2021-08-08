const fs = require("fs").promises
const path = require("path")

class ContactsService {
    constructor() { }
    
    contactsPath = path.join(__dirname, '../db/contacts.json')

    listContacts = async () => {
        try {
            const contacts = await fs.readFile(this.contactsPath, 'utf-8')
            return JSON.parse(contacts)
        } catch (e) {
            console.log("Ошибка при чтении файла");
        }
    }

    getContactById = async (id) => {
        try {
            const contacts = await this.listContacts()
            return contacts.find(el => el.id == id)   
        } catch (e) {
            console.log("Ошибка при чтении файла");
        }
    }

    removeContact = async (id) => {
        try {
            const contacts = await this.listContacts()
            const updatedContacts = contacts.filter((el) => el.id != id)
            if (updatedContacts.length === contacts.length) {
                return null
            }
            await fs.writeFile(this.contactsPath, JSON.stringify(updatedContacts))
            return await this.listContacts()
        } catch (e) {
            console.log("Ошибка при работе с файлом");
        }
    }

    updateContact = async (id, body) => {
        try {
            const contacts = await this.listContacts()
            const contact = await this.getContactById(id)
            if (!contact) return
            const updatedContacts = contacts.map(el => {
                if (el.id == id) {
                    return {id: el.id, ...body}
                }
                return el
            })
            await fs.writeFile(this.contactsPath, JSON.stringify(updatedContacts))
            const newContact = await this.getContactById(id)
            return newContact
        } catch (e) {
            console.log("Ошибка при работе с файлом");
        }
    }

    addContact = async (body) => {
        try {
            const contacts = await this.listContacts()
            const id = contacts[contacts.length - 1].id + 1
            contacts.push({
                id: id,
                ...body,
            })
            await fs.writeFile(this.contactsPath, JSON.stringify(contacts))
            return await this.getContactById(id)
        } catch (e) {
            console.log("Ошибка при работе с файлом");
        }
    }
}

module.exports = new ContactsService();