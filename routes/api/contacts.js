const express = require('express');

const {products: ctrl}=require('../../controllers')


const router = express.Router()

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById)

router.post('/', ctrl.add)

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId', ctrl.changeById)

module.exports = router;
