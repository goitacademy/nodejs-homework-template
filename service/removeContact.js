const Contact = require('./schemas/contact')


module.exports = (id) => {
    return Contact.findByIdAndRemove({ _id: id })
}

