const express = require('express')
const router = express.Router()

const ctrl = require("../../controllers/contacts")

// router.get('/', async (_req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.get("/", ctrl.getAllContacts); 

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.get("/:contactId", ctrl.getContactById); 

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.post("/", ctrl.addContact);

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.delete("/:contactId", ctrl.deleteContact);

// router.patch('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.put("/:contactId", ctrl.update);

module.exports = router
