const { Contact } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const removeAllContacts = async (req, res, next) => {
    // const contacts = await Contact.deleteMany({});

    const { id: userId } = req.user //?
    //* =============================console===================================
    console.log("removeAllContacts-->req.user:".bgYellow.red); //?
    // console.table(req.user); //?
    // console.table([req.user]);
    console.log(req.user);

    console.log("removeAllContacts-->userId:".bgYellow.blue, userId); //?
    console.log("");
    //* =======================================================================


    const contacts = await Contact.deleteMany({ owner: userId });

    //! ===========================console============================
    console.log("START-->DELETE/All".bgRed.yellow); //!
    lineBreak();
    console.log("ВСЕ ВАШИ ПОЛЬЗОВАТЕЛИ УДАЛЕНЫ...".bgRed.white); //!
    lineBreak();
    console.log("END-->DELETE/All".bgRed.yellow); //!
    lineBreak();
    //! ==============================================================


    res.status(200).json({
        status: "success",
        code: 204,
        message: "ALL Users were remove...",
        data: { contacts }
    });
};

module.exports = removeAllContacts;