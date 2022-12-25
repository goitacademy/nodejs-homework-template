const express = require('express')
// const {NotFound} = require("http-errors");
const router = express.Router();

const ctrl = require('../../controllers/contacts')





router.get("/", ctrl.getAll);

router.get('/:contactId', ctrl.getById)

router.post("/", ctrl.add);

router.delete("/:id", ctrl.deleteById )


router.put("/:id",ctrl.updateById);

module.exports = router
