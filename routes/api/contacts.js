const express = require('express')
const router = express.Router()
// const createError = require('http-errors')
const { NotFound } = require('http-errors')
// const Joi = require('joi')

// const contactsOperations = require("../../models/contacts")

const { validation, ctrlWrapper } = require("../../middlewares")
const { contactSchema } = require("../../schemas")
const { contacts: ctrl } = require("../../controllers")

const validateMiddlewarePostPut = validation(contactSchema.contactSchemaPostPut)
const validateMiddlewarePatch = validation(contactSchema.contactSchemaPatch)

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
// const contactSchemaPatch = Joi.object({
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



//! 1. Получение списка ВСЕХ КОНТАКТОВ
router.get("/", ctrlWrapper(ctrl.getAllContacts))


//! 2. Получение ОДНОГО КОНТАКТА по id
router.get('/:contactId', ctrlWrapper(ctrl.getContactById))


//! 3. Создание НОВОГО ПОЛЬЗОВАТЕЛЯ
router.post("/", validateMiddlewarePostPut, ctrlWrapper(ctrl.addContact));


//! 4-1. PUT-Обновление ОДНОГО КОНТАКТА по id
router.put('/:contactId', validateMiddlewarePostPut, ctrlWrapper(ctrl.updatePutContact));


//! 4-2. PATCH-Обновление ОДНОГО КОНТАКТА по id
router.patch("/:contactId", validateMiddlewarePatch, ctrlWrapper(ctrl.updatePatchContact));


//! 5. Удаление ОДНОГО КОНТАКТА по id
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));


//! 6. Удаление ВСЕХ КОНТАКТОВ
router.delete("/", ctrlWrapper(ctrl.removeAllContacts));


module.exports = router
