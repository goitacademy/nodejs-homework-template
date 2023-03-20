const Contact = require('../../models/contact')

const getListContacts = (owner, favorite, skip, limit) => {
    // console.log(owner)

    return Contact.find({ owner, favorite }, "", { skip, limit: Number(limit) })
}

module.exports = getListContacts