const { updateContact } = require('../../models/contacts');

const updateContactInList = async (req, res, next) => {
    const contactParamsId = req.params.contactId;
    const contactBody = req.body;

    const contacts = await updateContact(contactParamsId, contactBody)
    // console.log(contacts)

    if (contacts) {
        res.status(200).json({ status: "Ok", data: contacts })
        
    } else {
        res.status(404).json({ status: "Not Found" })
        
    }
}

module.exports = updateContactInList;