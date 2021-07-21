const express = require('express');

const { validateMiddleware } = require('../middleware');

const { categories: ctrl } = require('../controllers');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', express.json(), validateMiddleware, ctrl.add);

router.put('/:id', express.json(), ctrl.update);

router.delete('/:id', ctrl.del);

module.exports = router;
