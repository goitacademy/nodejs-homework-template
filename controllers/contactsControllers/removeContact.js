const { NotFound } = require('http-errors')
const { Contact } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
    // const contact = await Contact.findByIdAndRemove(contactId);

    const { id: user_id } = req.user //?
    //* =============================console===================================
    console.log("removeContactById-->req.user:".bgYellow.red); //?
    // console.table(req.user); //?
    // console.table([req.user]);
    console.log(req.user);

    console.log("removeContactById-->user_id:".bgYellow.blue, user_id); //?
    console.log("");
    //* =======================================================================


    //! ===========================console============================
    console.log("START-->DELETE/:id".red); //!
    lineBreak();
    //! ==============================================================


    const contact = await Contact.findOneAndRemove({ _id: contactId, owner: user_id });


    if (!contact) {
        //! ===========================console============================
        console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, contactId.red); //!
        lineBreak();
        console.log("END-->DELETE/:id".red); //!
        //! ==============================================================
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }


    //! ===========================console============================
    console.log(`Этот ПОЛЬЗОВАТЕЛЬ с ID: ${contactId} УДАЛЕН:`.bgRed.yellow); //!
    console.log(contact); //!
    lineBreak();
    console.log("END-->DELETE/:id".red); //!
    lineBreak();
    //! ==============================================================


    res.status(200).json({
        status: "success",
        code: 204,
        message: `User wiht id:'${contactId}'was remove:`,
        data: { contact }
    });
};

module.exports = removeContact;








//todo ------------- OLD ----------------------
// const { NotFound } = require('http-errors')
// const { Contact } = require("../../models");


// //-----------------------------------------------------------------------------
// const removeContact = async (req, res, next) => {
//     const { contactId } = req.params;
//     const contact = await Contact.findByIdAndRemove(contactId);

//     if (!contact) {
//         throw new NotFound(`Contact wiht id:'${contactId}' not found`)
//     }

//     res.status(200).json({
//         status: "success",
//         code: 204,
//         message: `User wiht id:'${contactId}'was remove:`,
//         data: { contact }
//     });
// };

// module.exports = removeContact;