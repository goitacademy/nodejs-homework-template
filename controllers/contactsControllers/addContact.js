
const { Contact } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const addContact = async (req, res, next) => {
    // const contact = await Contact.create(req.body);

    const { _id: user_id } = req.user //?
    //* =============================console===================================
    console.log("addContact-->req.user:".bgYellow.red); //?
    console.table(req.user); //?
    console.table([req.user]);

    console.log("addContact-->user_id:".bgYellow.blue, user_id.bgGreen.blue); //?
    console.log("");
    //* =======================================================================


    const contact = await Contact.create({ ...req.body, owner: user_id }); //?


    //! ===========================console============================
    console.log("START-->POST".yellow); //!
    lineBreak();
    console.log(`НОВЫЙ ПОЛЬЗОВАТЕЛЬ с ID: ${contact.id}:`.bgYellow.blue); //!
    // console.table([contact]); //!
    console.log(contact); //!
    lineBreak();
    console.log("END-->POST".yellow); //!
    lineBreak();
    //! ==============================================================


    res.status(201).json({
        status: "success",
        code: 201,
        data: { contact }
    });
};

module.exports = addContact;







//todo ---------- OLD ------------------------
// const { Contact } = require("../../models");


// //-----------------------------------------------------------------------------
// const addContact = async (req, res, next) => {
//     const contact = await Contact.create(req.body);

//     res.status(201).json({
//         status: "success",
//         code: 201,
//         data: { contact }
//     });
// };

// module.exports = addContact;
