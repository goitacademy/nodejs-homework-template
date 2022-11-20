const contactsOperations = require("../../models/contacts")


//-----------------------------------------------------------------------------
const getAllContacts = async (req, res, next) => {
    // try {
    const contacts = await contactsOperations.listContacts()

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            result: contacts
        }
    })

    // } catch (e) {
    //     next(e)
    // }
}

module.exports = getAllContacts