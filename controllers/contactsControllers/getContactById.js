const { NotFound } = require('http-errors')
const { Contact } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    // const contact = await Contact.findOne({ _id: contactId }); //! 1-ый вариант
    // const contact = await Contact.findById(contactId); //! 2-ой вариант

    const { id: userId } = req.user //?
    //* =============================console===================================
    console.log("getContactById-->req.user:".bgYellow.red); //?
    // console.table(req.user); //?
    // console.table([req.user]);
    console.log(req.user);

    console.log("getContactById-->userId:".bgYellow.blue, userId); //?
    console.log("");
    //* =======================================================================


    //! ===========================console============================
    console.log("START-->GET/:id".blue); //!
    lineBreak();
    //! ==============================================================


    const contact = await Contact.findOne({ _id: contactId, owner: userId }); //! 1-ый вариант


    if (!contact) {
        //! ===========================console============================
        console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, contactId.red); //!
        lineBreak();
        console.log("END-->GET/:id".blue); //!
        //! ==============================================================
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }


    //! ===========================console============================
    console.log(`ПОЛЬЗОВАТЕЛЬ с ID: ${contactId}:`.bgBlue.yellow); //!
    // console.table([contact]); //!
    console.log(contact); //!
    lineBreak();
    console.log("END-->GET/:id".blue); //!
    lineBreak();
    //! ==============================================================


    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
};

module.exports = getContactById;