const {Contact} = require('../../models/contact')

const updateStatusContact = async(req, res, next) => {
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    res.json(result).status(200)
}

module.exports = updateStatusContact