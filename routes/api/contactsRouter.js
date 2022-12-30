const express = require('express')
const router = express.Router()

const { validation, controllerWrapper, isValidId, authMiddleware } = require("../../middlewares")

const {
    contactJoiSchemaPut,
    contactJoiSchemaPatch,
    contactJoiSchemaPatchFavorite
} = require("../../models/contactModel.js");
const validateMiddlewarePut = validation(contactJoiSchemaPut);
const validateMiddlewarePatch = validation(contactJoiSchemaPatch);
const validateMiddlewarePatchFavorite = validation(contactJoiSchemaPatchFavorite);

const { contactsControllers: ctrl } = require("../../controllers")



//-----------------------------------------------------------------------------
//! 0. authMiddleware
router.use(authMiddleware);

//! 1. Получение списка ВСЕХ КОНТАКТОВ
router.get("/", controllerWrapper(ctrl.getAllContacts))


//! 2. Получение ОДНОГО КОНТАКТА по id
router.get('/:contactId', isValidId, controllerWrapper(ctrl.getContactById))


//! 3. Создание НОВОГО ПОЛЬЗОВАТЕЛЯ
// router.post("/", controllerWrapper(ctrl.addContact));
router.post("/", validateMiddlewarePut, controllerWrapper(ctrl.addContact));


//! 4-1. PUT-Обновление ОДНОГО КОНТАКТА по id
// router.put('/:contactId', controllerWrapper(ctrl.updatePutContact));
router.put('/:contactId', isValidId, validateMiddlewarePut, controllerWrapper(ctrl.updatePutContact));



//! 4-2. PATCH-Обновление ОДНОГО КОНТАКТА по id
router.patch("/:contactId", isValidId, validateMiddlewarePatch, controllerWrapper(ctrl.updatePatchContact));


//! 4-3. PATCH-Обновление поле статуса favorite по id
// router.patch("/:contactId/favorite", controllerWrapper(ctrl.updatePatchContactFavorite));
router.patch("/:contactId/favorite", isValidId, validateMiddlewarePatchFavorite, controllerWrapper(ctrl.updatePatchContactFavorite));


//! 5. Удаление ОДНОГО КОНТАКТА по id
router.delete('/:contactId', isValidId, controllerWrapper(ctrl.removeContact));


//! 6. Удаление ВСЕХ КОНТАКТОВ
router.delete("/", controllerWrapper(ctrl.removeAllContacts));


module.exports = router
