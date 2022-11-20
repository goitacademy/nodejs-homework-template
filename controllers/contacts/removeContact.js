const { NotFound } = require('http-errors')

const contactsOperations = require("../../models/contacts")

//-----------------------------------------------------------------------------
const removeContact = async (req, res, next) => {
    // try {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId)

    if (!contact) {
        //! 4 - вариант
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
        status: "success",
        code: 204,
        message: `User wiht id:'${contactId}'was remove:`,
        data: {
            result: contact
        }
    });

    // } catch (e) {
    //     next(e);
    // }
}

module.exports = removeContact