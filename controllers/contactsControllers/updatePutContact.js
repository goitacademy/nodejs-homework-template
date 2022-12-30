
//todo ---------- OLD ------------------------
const { NotFound } = require('http-errors')
const { Contact } = require("../../models");


//-----------------------------------------------------------------------------
const updatePutContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!contact) {
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
};

module.exports = updatePutContact;