const Contact = require('../../models/contact')

const getContactById = (id) => {
    return Contact.findOne({ _id: id })
}

module.exports = getContactById