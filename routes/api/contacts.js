const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

<<<<<<< Updated upstream
const validateBody = require("../../middlewares/validateBody")

const schemas = require("../../schemas/contacts")
=======
const { schemas } = require("../../models/contact")
const { isValidId, validateBody, auth } = require('../../middlewares')
>>>>>>> Stashed changes

router.get("/", auth, ctrl.getAll)

<<<<<<< Updated upstream
router.get('/:contactId', ctrl.getById)
=======
router.get('/:contactId', auth, isValidId, ctrl.getById)
>>>>>>> Stashed changes

router.post('/', auth, validateBody(schemas.addSchema), ctrl.addContact)

<<<<<<< Updated upstream
router.delete('/:contactId', ctrl.deleteContact)

router.put('/:contactId', validateBody(schemas.changeSchema), ctrl.updateContact)
=======
router.delete('/:contactId', auth, isValidId, ctrl.deleteContact)

router.put('/:contactId', auth, isValidId, validateBody(schemas.changeSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', auth, isValidId, validateBody(schemas.changeFavoriteStatus), ctrl.updateStatusContact)
>>>>>>> Stashed changes

module.exports = router
