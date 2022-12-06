const contacts = require('../models/contacts')


const update = async (req, res, next) => {

    const { contactId } = req.params     
    const result = await contacts.updateContact(contactId, req.body)
    
    if (!result) {
        return res.status(404).json({"message": "Not found"})
    }

    res.json(result)
}

module.exports = update