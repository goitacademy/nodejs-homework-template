const Contact = require('../../models/contact')

const addContact = ({ name, email, phone, favorite = false }) => {
    return Contact.create({ name, email, phone, favorite })
}

module.exports = addContact