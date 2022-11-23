const { NotFound } = require('http-errors')
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



const updatePutContact = async (req, res, next) => {
    //! ===========================console============================
    console.log("START-->PUT/:id".rainbow); //!
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
    //     console.log("END-->PUT/:id".rainbow); //!
    //     //! ==============================================================
    //     //! 1 - вариант
    //     // return res.status(400).json({ "message": "missing required name field" });
    //     //! 2 - вариант
    //     // validationResult.error.status = 400
    //     // throw validationResult.error
    //     //! 3 - вариант
    //     return res.status(400).json({ status: validationResult.error.details });
    // }
    //* __________________________ ВАЛИДАЦИЯ Joi __________________________


    const { contactId } = req.params;
    const contact = await contactsOperations.updatePutContact(contactId, req.body)

    if (!contact) {
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
}

module.exports = updatePutContact