const { NotFound } = require('http-errors')
const { Contact } = require("../../models");


//-----------------------------------------------------------------------------
const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    // const contact = await Contact.findOne({ _id: contactId });
    const contact = await Contact.findById(contactId);

    if (!contact) {
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
};

module.exports = getContactById;
