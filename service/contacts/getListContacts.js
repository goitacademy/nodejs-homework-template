const Contact = require('../../models/contact')

const getListContacts = (owner) => {
    // console.log(owner)
    return Contact.find({ owner })
}

module.exports = getListContacts