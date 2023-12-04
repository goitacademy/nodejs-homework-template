const express = require('express')

const router = express.Router()

const ctrl = require("../../controllers/contacts");


router.get("/", ctrl.findContact);

router.get('/:id', ctrl.findByIdContact);

router.post("/", ctrl.createConctact);

router.put('/:Id', ctrl.updateContact);

module.exports = router;
