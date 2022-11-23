// const Joi = require('joi')

const contactsOperations = require("../../models/contacts")
const { lineBreak } = require("../../service");


//-----------------------------------------------------------------------------
//* ++++++++++++++++++++++ Схема ВАЛИДАЦИИ Joi +++++++++++++++++++++++++
// const contactSchemaPostPut = Joi.object({
//     name: Joi.string()
//         // .alphanum()
//         .min(3)
//         .max(30)
//         .required(),

//     email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
//         .required(),

//     phone: Joi.string()
//         // .alphanum()
//         .min(5)
//         .max(14)
//         .required(),
// });
//* _______________________ Схема ВАЛИДАЦИИ Joi _______________________


const addContact = async (req, res, next) => {
    //! ===========================console============================
    console.log("START-->POST".yellow); //!
    lineBreak();
    //! ==============================================================


    //* +++++++++++++++++++++++ ВАЛИДАЦИЯ Joi +++++++++++++++++++++++++++++
    // const validationResult = contactSchemaPostPut.validate(req.body);

    // if (validationResult.error) {
    //     //! ===========================console============================
    //     console.log("Ошибка ВАЛИДАЦИИ:".bgRed.black);
    //     console.log("");
    //     console.log(validationResult.error);
    //     lineBreak();
    //     console.log("END-->POST".yellow); //!
    //     //! ==============================================================
    //     //! 3 - вариант
    //     return res.status(400).json({ status: validationResult.error.details });
    // }
    //* __________________________ ВАЛИДАЦИЯ Joi __________________________

    const contact = await contactsOperations.addContact(req.body)

    res.status(201).json({
        status: "success",
        code: 201,
        data: { contact }
    });
}

module.exports = addContact