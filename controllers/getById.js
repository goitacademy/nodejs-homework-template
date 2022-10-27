const {Contact} = require('../models/contact')

const getById = async (req, res, next) => {
        const {contactId} = req.params
        const result = await Contact.findById(contactId)
        res.status(200).json(result)
}

module.exports = getById