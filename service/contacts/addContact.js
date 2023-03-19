const Contact = require('../../models/contact')

const addContact = ({ name, email, phone, favorite = false }, owner) => {
    return Contact.create({ name, email, phone, favorite, owner })
}

module.exports = addContact