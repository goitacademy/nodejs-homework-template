
const { Contact } = require("../../models/contacts");

const  createError  = require("../../middleware/createError");

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const reply = await Contact.findByIdAndRemove(contactId);
    if (!reply) {
        throw createError(404)
    }
    res.json({
        message: "Contact deleted"
    })
}

module.exports = removeContact; 