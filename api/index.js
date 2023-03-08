const express = require('express');
const controllersContacts = require('../controllers');
const { validateBody, isValidId } = require("../middlewares");
const {allSchemas} = require("../model/contactSchema")

const router = express.Router();

router.get('/', controllersContacts.get);

router.get('/:id', isValidId, controllersContacts.getById);

router.post('/', validateBody(allSchemas.addJoiSchema), controllersContacts.create);

router.put('/:id', isValidId, validateBody(allSchemas.addJoiSchema), controllersContacts.change);

router.patch(
    "/:id/favorite",
    isValidId,
    validateBody(allSchemas.updateFovoriteJoiSchema),
    controllersContacts.favorite);

router.delete('/:id', isValidId, controllersContacts.remove)

module.exports = router