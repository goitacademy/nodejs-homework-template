const { Contact } = require('../../models/schema');

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
        return res.status(404).json({ "message": "Not found" });
    }
    res.json({
        "status": 'success',
        "code": 200,
        "message": "contact deleted",
        data: { contact },
    })
    
}

module.exports= removeContact