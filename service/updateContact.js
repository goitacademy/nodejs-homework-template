const Contact = require('./schemas/contact')

module.exports = (id, fields) => {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
}
