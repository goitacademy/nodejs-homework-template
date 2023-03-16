const Contact = require('../../models/contact')


const removeContact = (id) => {
    return Contact.findByIdAndRemove({ _id: id })
}

module.exports = removeContact