const express = require('express')
const router = express.Router()
// const createError = require('http-errors')
const { NotFound } = require('http-errors')
const Joi = require('joi')

// const contactsOperations = require("../../models/contacts")

const { contacts: ctrl } = require("../../controllers")

// const { lineBreak } = require("../../service");


//-----------------------------------------------------------------------------
//* ++++++++++++++++++++++ Схемы ВАЛИДАЦИИ Joi +++++++++++++++++++++++++
// const contactSchemaPostPut = Joi.object({
//   name: Joi.string()
//     // .alphanum()
//     .min(3)
//     .max(30)
//     .required(),

//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
//     .required(),

//   phone: Joi.string()
//     // .alphanum()
//     .min(5)
//     .max(14)
//     .required(),
// });

//--------------------------------------------------------------------
// const contactSchemaPutch = Joi.object({
//   name: Joi.string()
//     // .alphanum()
//     .min(3)
//     .max(30)
//     .optional(),

//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
//     .optional(),

//   phone: Joi.string()
//     // .alphanum()
//     .min(5)
//     .max(14)
//     .optional(),
// });
//* _______________________ Схемы ВАЛИДАЦИИ Joi _______________________



//-----------------------------------------------------------------------------
//! 1. Получение списка ВСЕХ КОНТАКТОВ
router.get("/", ctrl.getAllContacts)



//-----------------------------------------------------------------------------
//! 2. Получение ОДНОГО КОНТАКТА по id
router.get('/:contactId', ctrl.getContactById)



//-----------------------------------------------------------------------------
//! 3. Создание НОВОГО ПОЛЬЗОВАТЕЛЯ
router.post("/", ctrl.addContact);



//-----------------------------------------------------------------------------
//! 4-1. PUT-Обновление ОДНОГО КОНТАКТА по id
router.put('/:contactId', ctrl.updatePutContact);



//-----------------------------------------------------------------------------
//! 4-2. PATCH-Обновление ОДНОГО КОНТАКТА по id
router.patch("/:contactId", ctrl.updatePatchContact);



//-----------------------------------------------------------------------------
//! 5. Удаление ОДНОГО КОНТАКТА по id
router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId)

    if (!contact) {
      //! 4 - вариант
      throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
      status: "success",
      code: 204,
      message: `User wiht id:'${contactId}'was remove:`,
      data: {
        result: contact
      }
    });

  } catch (e) {
    next(e);
    // res.status(500).json({ error: e.message });
  }
});



//-----------------------------------------------------------------------------
//! 6. Удаление ВСЕХ КОНТАКТОВ
router.delete("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.removeAllContacts()

    res.status(200).json({
      status: "success",
      code: 204,
      message: "ALL Users were remove...",
      data: {
        result: contacts
      }
    });

  } catch (e) {
    next(e);
    // res.status(500).json({ error: e.message });
  }
});


module.exports = router
