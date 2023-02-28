const express = require('express')

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const {validateBody, isValidId} = require("../../middlewares")

const {schemas} = require("../../models/contact")

router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById )

router.post('/', validateBody(schemas.addSchema), ctrl.add)

router.delete('/:contactId', isValidId, ctrl.deleteById)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateById)

router.patch('/:contactId/favorite ', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)


module.exports = router;



