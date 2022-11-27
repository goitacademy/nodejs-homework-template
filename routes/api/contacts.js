const express = require('express')
const router = express.Router()

const { validation, ctrlWrapper, isValidId } = require("../../middlewares")

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
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById))


//! 3. Создание НОВОГО ПОЛЬЗОВАТЕЛЯ
// router.post("/", ctrlWrapper(ctrl.addContact));
router.post("/", validateMiddlewarePostPut, ctrlWrapper(ctrl.addContact));


//! 4-1. PUT-Обновление ОДНОГО КОНТАКТА по id
// router.put('/:contactId', ctrlWrapper(ctrl.updatePutContact));
router.put('/:contactId', isValidId, validateMiddlewarePostPut, ctrlWrapper(ctrl.updatePutContact));



//! 4-2. PATCH-Обновление ОДНОГО КОНТАКТА по id
router.patch("/:contactId", isValidId, validateMiddlewarePatch, ctrlWrapper(ctrl.updatePatchContact));


//! 4-3. PATCH-Обновление поле статуса favorite по id
// router.patch("/:contactId/favorite", ctrlWrapper(ctrl.updatePatchContactFavorite));
router.patch("/:contactId/favorite", isValidId, validateMiddlewarePatchFavorite, ctrlWrapper(ctrl.updatePatchContactFavorite));


//! 5. Удаление ОДНОГО КОНТАКТА по id
router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact));


//! 6. Удаление ВСЕХ КОНТАКТОВ
router.delete("/", ctrlWrapper(ctrl.removeAllContacts));


module.exports = router
