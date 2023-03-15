const Contact = require('./schemas/contact')


module.exports = ({ name, email, phone, favorite = false }) => {
    return Contact.create({ name, email, phone, favorite })
}
