// const express = require('express')

// const router = express.Router()

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message!' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message!' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router


const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../fetch");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addNewContact);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", ctrl.editById);

module.exports = router;