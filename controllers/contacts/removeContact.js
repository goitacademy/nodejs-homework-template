const { NotFound } = require('http-errors')
const { Contact } = require("../../models");


//-----------------------------------------------------------------------------
const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);

    if (!contact) {
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
        status: "success",
        code: 204,
        message: `User wiht id:'${contactId}'was remove:`,
        data: { contact }
    });
};

module.exports = removeContact;