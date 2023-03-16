const Contact = require('../../schemas/contact')

const updateContact = (id, fields) => {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

module.exports = updateContact