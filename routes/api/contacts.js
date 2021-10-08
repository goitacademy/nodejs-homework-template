<<<<<<< Updated upstream
const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})
=======
const express = require("express");
const router = express.Router();
const validate = require("./validation");
const contactsController = require("../../controller/contacts");

router
  .get("/", contactsController.getAll)
  .post("/", validate.addContact, contactsController.create);

router
  .get("/:id", contactsController.getById)
  .delete("/:id", contactsController.remove)
  .patch("/:id", validate.updateContact, contactsController.update);
>>>>>>> Stashed changes

module.exports = router
