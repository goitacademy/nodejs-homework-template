const express = require('express');

const {contacts: ctrl} = require('../../controllers')


const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post('/', ctrl.add);

router.put('/:id', ctrl.updateById);

router.delete("/:id", ctrl.remuveById)

module.exports = router;