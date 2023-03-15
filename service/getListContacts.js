const Contact = require('./schemas/contact')

module.exports = () => {
    return Contact.find()
}


