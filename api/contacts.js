const express = require('express');
const { ctrlWrapper } = require("../helpers");
const { contacts: ctrl } = require('../controllers');
const { joiSchema } = require("../models/schemas/contact");
const { validation } = require("../middlewares");

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', validation(joiSchema), ctrl.add);
router.put("/:id", ctrlWrapper(ctrl.update));
router.delete('/:id', ctrl.del)
router.patch("/:contactId/favorite", validation(joiSchema), ctrl.updateStatus);

module.exports = router;