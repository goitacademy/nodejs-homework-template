
const { Contact } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const addContact = async (req, res, next) => {
    // const contact = await Contact.create(req.body);

    const { id: userId } = req.user //?
    //* =============================console===================================
    console.log("addContact-->req.user:".bgYellow.red); //?
    // console.table(req.user); //?
    // console.table([req.user]);
    console.log(req.user);

    console.log("addContact-->userId:".bgYellow.blue, userId.bgGreen.blue); //?
    console.log("");
    //* =======================================================================


    const contact = await Contact.create({ ...req.body, owner: userId }); //?


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