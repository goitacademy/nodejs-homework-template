const Contact = require('../../schemas/contact')


const removeContact = (id) => {
    return Contact.findByIdAndRemove({ _id: id })
}

module.exports = removeContact