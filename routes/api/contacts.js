const express = require('express');

const {products: ctrl}=require('../../controllers')


const router = express.Router()

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById)

router.post('/', ctrl.add)

router.delete('/:contactId', ctrl.updateById)

router.put('/:contactId', ctrl.changeById)

module.exports = router
