const contactsOperations = require("../../model/contacts");

const deleteContact =   async (req, res, next) => {
    try {
        const { contactId } = req.params;
const removeContact = await contactsOperations.deleteContact(contactId);
if (!removeContact) { 
    return res.status(404).json({
    "message": "Not found"
})
}
res.json({ message: "contact deleted", removeContact})
    }
catch (error) {
    next(error)
}
}
module.exports = deleteContact;