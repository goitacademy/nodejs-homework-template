const express = require('express');
const controller = require('../../controllers');

const router = express.Router();


router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.add);

router.delete('/:id', controller.deleteById);

router.put('/:id', controller.updateById);

module.exports = router
