const Contact = require('./schemas/contact')


const addContact = ({ name, email, phone, favorite = false }) => {
    return Contact.create({ name, email, phone, favorite })
}

module.exports = addContact