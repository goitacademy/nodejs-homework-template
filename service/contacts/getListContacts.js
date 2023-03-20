const Contact = require('../../models/contact')

const getListContacts = (owner, skip, limit) => {
    // console.log(owner)

    return Contact.find({ owner }, "", { skip, limit: Number(limit) })
}

module.exports = getListContacts