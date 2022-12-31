const { NotFound, BadRequest } = require('http-errors');
const { Contact } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const updatePatchContactFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body
    console.log("favorite:", favorite);

    //! Проверка условия "Если body нет" - 1-ый вариант
    // let contact = null;
    // if (favorite === false || favorite === true) {
    //     contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    // } else {
    //     throw new BadRequest("missing field favorite")
    // };
    // const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    //! Проверка условия "Если body нет" - 2-ой вариант
    // if ((favorite === false || favorite === true)) {
    //     throw new BadRequest("missing field favorite")
    // }


    // const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    const { id: user_id } = req.user //?
    //* =============================console===================================
    console.log("updatePatchContactFavorite-->req.user:".bgYellow.red); //?
    // console.table(req.user); //?
    // console.table([req.user]);
    console.log(req.user);

    console.log("updatePatchContactFavorite-->user_id:".bgYellow.blue, user_id); //?
    console.log("");
    //* =======================================================================


    //! ===========================console============================
    console.log("START-->PATCH/:id/favorite".rainbow); //!
    lineBreak();
    //! ==============================================================

    const contact = await Contact.findOneAndUpdate({ _id: contactId, owner: user_id }, { favorite }, { new: true });


    if (!contact) {
        //! ===========================console============================
        console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, contactId.red); //!
        lineBreak();
        console.log("END-->PATCH/:id/favorite".rainbow); //!
        //! ==============================================================
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    //! ===========================console============================
    console.log(`ОБНОВЛЕННЫЙ ПОЛЬЗОВАТЕЛЬ с ID: ${contactId}:`.rainbow); //!
    console.log(contact); //!
    lineBreak();
    console.log("END-->PATCH/:id/favorite".rainbow); //!
    lineBreak();
    //! ==============================================================

    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
};

module.exports = updatePatchContactFavorite;






//todo --------- OLD --------------------
// const { NotFound, BadRequest } = require('http-errors');
// const { Contact } = require("../../models");


// //-----------------------------------------------------------------------------
// const updatePatchContactFavorite = async (req, res, next) => {
//     const { contactId } = req.params;
//     const { favorite } = req.body

//     //! Проверка условия "Если body нет"
//     if (!(favorite === false || favorite === true)) {
//         throw new BadRequest("missing field favorite")
//     }

//     const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

//     if (!contact) {
//         throw new NotFound(`Contact wiht id:'${contactId}' not found`)
//     }

//     res.status(200).json({
//         status: "success",
//         code: 200,
//         data: { contact }
//     })
// };

// module.exports = updatePatchContactFavorite;





