const contactsOperations = require("../../models/contacts")
const { lineBreak } = require("../../service");


//-----------------------------------------------------------------------------
const addContact = async (req, res, next) => {
    //! ===========================console============================
    console.log("START-->POST".yellow); //!
    lineBreak();
    //! ==============================================================

    const contact = await contactsOperations.addContact(req.body)

    res.status(201).json({
        status: "success",
        code: 201,
        data: { contact }
    });
}

module.exports = addContact