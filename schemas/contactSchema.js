const contactSchema = {
    name: '',
    email: '',
    phone: ''
}
const contactMandatoryFields = Object.keys(contactSchema);

module.exports = {
    contactMandatoryFields
}