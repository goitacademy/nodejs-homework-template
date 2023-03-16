const Contact = require('../../schemas/contact')

const getListContacts = () => {
    return Contact.find()
}

module.exports = getListContacts