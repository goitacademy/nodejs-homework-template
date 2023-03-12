const { removeContact } = require('../../models/contacts');


const deleteById = async (req, res, next) => {
    const contactParamsId = req.params.contactId;
    const contact = await removeContact(contactParamsId)
    
    // console.log(contact)
    if (contact) {
        res.status(204).json({ status: "No Content", data: contact })
        
    } else {
        res.status(404).json({ status: "Not Found" })
        
    }
}

module.exports = deleteById;