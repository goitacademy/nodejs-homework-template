const express = require('express')
const router = express.Router()

const { validation, ctrlWrapper } = require("../../middlewares")
//todo --> OLD
// const { contactSchema } = require("../../schemas")
// const validateMiddlewarePostPut = validation(contactSchema.contactSchemaPostPut)
// const validateMiddlewarePatch = validation(contactSchema.contactSchemaPatch)

//? --> 1-ый вариант
// const Contact = require("../../models/contact.js");
// const validateMiddlewarePostPut = validation(Contact.contactJoiSchemaPostPut);
// const validateMiddlewarePatch = validation(Contact.contactJoiSchemaPatch);

//? --> 2-ой вариант
const {
    contactJoiSchemaPostPut,
    contactJoiSchemaPatch,
    contactJoiSchemaPatchFavorite
} = require("../../models/contact.js");
const validateMiddlewarePostPut = validation(contactJoiSchemaPostPut);
const validateMiddlewarePatch = validation(contactJoiSchemaPatch);
const validateMiddlewarePatchFavorite = validation(contactJoiSchemaPatchFavorite);

const { contacts: ctrl } = require("../../controllers")





//-----------------------------------------------------------------------------
//! 1. Получение списка ВСЕХ КОНТАКТОВ
router.get("/", ctrlWrapper(ctrl.getAllContacts))


//! 2. Получение ОДНОГО КОНТАКТА по id
router.get('/:contactId', ctrlWrapper(ctrl.getContactById))


//! 3. Создание НОВОГО ПОЛЬЗОВАТЕЛЯ
// router.post("/", ctrlWrapper(ctrl.addContact));
router.post("/", validateMiddlewarePostPut, ctrlWrapper(ctrl.addContact));


//! 4-1. PUT-Обновление ОДНОГО КОНТАКТА по id
// router.put('/:contactId', ctrlWrapper(ctrl.updatePutContact));
router.put('/:contactId', validateMiddlewarePostPut, ctrlWrapper(ctrl.updatePutContact));



//! 4-2. PATCH-Обновление ОДНОГО КОНТАКТА по id
router.patch("/:contactId", validateMiddlewarePatch, ctrlWrapper(ctrl.updatePatchContact));


//! 4-3. PATCH-Обновление поле статуса favorite по id
// router.patch("/:contactId/favorite", ctrlWrapper(ctrl.updatePatchContactFavorite));
router.patch("/:contactId/favorite", validateMiddlewarePatchFavorite, ctrlWrapper(ctrl.updatePatchContactFavorite));


//! 5. Удаление ОДНОГО КОНТАКТА по id
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));


//! 6. Удаление ВСЕХ КОНТАКТОВ
router.delete("/", ctrlWrapper(ctrl.removeAllContacts));


module.exports = router
