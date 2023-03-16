const Contact = require('../../models/contact')

const getListContacts = () => {
    return Contact.find()
}

module.exports = getListContacts