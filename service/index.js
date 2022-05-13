const Contact = require("./schemas/contacts")

const listContacts = () => Contact.find({})

module.exports = {
    listContacts,
}