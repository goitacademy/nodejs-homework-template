const { NotFound } = require('http-errors')

const contactsOperations = require("../../models/contacts")

//-----------------------------------------------------------------------------
const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId)

    if (!contact) {
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
}

module.exports = getContactById