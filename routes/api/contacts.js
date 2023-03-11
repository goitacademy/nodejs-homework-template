const express = require('express');
const { contactsCntr } = require('../../controllers')
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../model/contactSchema");

const {get, getById, create, change, favorite, remove} = contactsCntr


const router = express.Router();

router.get(
    '/',
    authenticate,
    get
);

router.get(
    '/:id',
    authenticate,
    isValidId,
    getById
);

router.post(
    '/',
    authenticate,
    validateBody(schemas.addJoiSchema),
    create
);

router.put(
    '/:id',
    isValidId,
    authenticate,
    validateBody(schemas.addJoiSchema),
    change
);

router.patch(
    "/:id/favorite",
    authenticate,
    isValidId,
    validateBody(schemas.updateFovoriteJoiSchema),
    favorite);

router.delete(
    '/:id',
    authenticate,
    isValidId,
    remove
)

module.exports = router