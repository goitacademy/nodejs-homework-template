const express = require('express');
const controller = require('../../controllers');
const {isValidId} = require("../../middlewares");

const router = express.Router();


router.get('/', controller.getAll);

router.get('/:id', isValidId, controller.getById);

router.post('/', controller.add);

router.delete('/:id', isValidId, controller.deleteById);

router.put('/:id', isValidId, controller.updateById);

router.patch('/:id/favorite', isValidId, controller.updateStatusContact);

module.exports = router
