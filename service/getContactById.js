const Contact = require('./schemas/contact')

module.exports = (id) => {
    return Contact.findOne({ _id: id })
}

