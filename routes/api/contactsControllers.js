const express = require('express')

const contacts = require("../../models/contactsOper.js")
const ctrl = require("../../controllers/contacts/index.js")

const router = express.Router()

const { HttpError } = require("../../helpers/HttpErrors")

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', ctrl.add)

router.put('/:contactId', ctrl.updateById)

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeById(contactId)

    if (!result) {
      throw HttpError(404, "Not found")
    }

    res.status(200).json({ message: "contact deleted" })
  } catch (err) {
    next(err)
  }
})


module.exports = router
