const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {validateBody} = require("../../middlewares")

const { schemas } = require("../../models/contacts");

router.get('/', ctrl.getAll);

// router.get('/:id', ctrl.getById);

router.post('/', validateBody(schemas.contactsAddSchema), ctrl.add);

// router.delete('/:id', );

// router.put('/:id', ctrl.updateById);

module.exports = router;
