const express = require('express')

// const contacts = require("../../models/contacts")


const ctrl = require('../../controllers/contacts')

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contact")

const { ctrlWrapper } = require("../../helpers")

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts))

router.get("/:contactId", ctrlWrapper(ctrl.getContactById))

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact))

router.put("/:contactId", validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact))

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact))

module.exports = router;











// const contacts = require("../../models/contacts")

// const router = express.Router()

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router
