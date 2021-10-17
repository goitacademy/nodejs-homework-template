
const contactsOperations = require("../../model/contacts");

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactsOperations.getAllContacts();
        res.json({ contacts })
    }
    catch (error) {
        next(error)
    }

}
module.exports = getAllContacts;