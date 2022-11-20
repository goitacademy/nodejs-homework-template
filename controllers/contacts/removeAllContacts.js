// const { NotFound } = require('http-errors')

const contactsOperations = require("../../models/contacts")

//-----------------------------------------------------------------------------
const removeAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactsOperations.removeAllContacts()

        res.status(200).json({
            status: "success",
            code: 204,
            message: "ALL Users were remove...",
            data: {
                result: contacts
            }
        });

    } catch (e) {
        next(e);
        // res.status(500).json({ error: e.message });
    }
}

module.exports = removeAllContacts