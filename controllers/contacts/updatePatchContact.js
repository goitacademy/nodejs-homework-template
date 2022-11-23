const { NotFound } = require('http-errors')
// const Joi = require('joi')

const contactsOperations = require("../../models/contacts")
const { lineBreak } = require("../../service");


//-----------------------------------------------------------------------------
//* ++++++++++++++++++++++ Схема ВАЛИДАЦИИ Joi +++++++++++++++++++++++++
// const contactSchemaPatch = Joi.object({
//     name: Joi.string()
//         // .alphanum()
//         .min(3)
//         .max(30)
//         .optional(),

//     email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
//         .optional(),

//     phone: Joi.string()
//         // .alphanum()
//         .min(5)
//         .max(14)
//         .optional(),
// });
//* _______________________ Схема ВАЛИДАЦИИ Joi _______________________



const updatePatchContact = async (req, res, next) => {
    //! ===========================console============================
    console.log("START-->PATCH/:id".rainbow); //!
    lineBreak();
    //! ==============================================================


    //* +++++++++++++++++++++++ ВАЛИДАЦИЯ Joi +++++++++++++++++++++++++++++
    // const validationResult = contactSchemaPatch.validate(req.body);

    // if (validationResult.error) {
    //     //! ===========================console============================
    //     console.log("Ошибка ВАЛИДАЦИИ:".bgRed.black);
    //     console.log("");
    //     console.log(validationResult.error);
    //     lineBreak();
    //     console.log("END-->PATCH/:id".rainbow); //!
    //     //! ==============================================================

    //     //! 3 - вариант
    //     return res.status(400).json({ status: validationResult.error.details });
    // }
    //* __________________________ ВАЛИДАЦИЯ Joi __________________________

    const { contactId } = req.params;
    const contact = await contactsOperations.updatePatchContact(contactId, req.body)

    if (!contact) {
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
}

module.exports = updatePatchContact