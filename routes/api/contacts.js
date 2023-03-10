const express = require('express');
const { contactsCntr } = require('../../controllers')
const { validateBody, isValidId } = require("../../middlewares");
const {allSchemas} = require("../../model/contactSchema")

const router = express.Router();

router.get(
    '/',
    contactsCntr.get
);

router.get(
    '/:id',
    isValidId,
    contactsCntr.getById
);

router.post(
    '/',
    validateBody(allSchemas.addJoiSchema),
    contactsCntr.create
);

router.put(
    '/:id',
    isValidId,
    validateBody(allSchemas.addJoiSchema),
    contactsCntr.change
);

router.patch(
    "/:id/favorite",
    isValidId,
    validateBody(allSchemas.updateFovoriteJoiSchema),
    contactsCntr.favorite);

router.delete('/:id', isValidId, contactsCntr.remove)

module.exports = router