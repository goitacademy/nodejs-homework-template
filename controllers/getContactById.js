const Contact = require("../models/contact")



async function getContactById (req, res, next){
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId)
    if (!contact) {
        return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
}

module.exports = getContactById

