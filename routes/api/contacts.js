const express = require('express');
const controller = require('../../controllers');
const {isValidId, authenticate} = require("../../middlewares");

const router = express.Router();


router.get('/', authenticate, controller.getAll);

router.get('/:id', authenticate, isValidId, controller.getById);

router.post('/', authenticate, controller.add);

router.delete('/:id', authenticate, isValidId, controller.deleteById);

router.put('/:id', authenticate, isValidId, controller.updateById);

router.patch('/:id/favorite', authenticate, isValidId, controller.updateStatusContact);

module.exports = router
