const express = require('express')
const router = express.Router()
const { joiSchema, updateFavoriteJoiSchema } = require("../../models/contact")
const {validation} = require('../../middlewares')
const {  ctrl } = require("../../controllers")
/* console.log(ctrl) */


router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validation(joiSchema),ctrl.add)

router.delete('/:contactId', ctrl.remove)

router.put ('/:contactId', validation(joiSchema), ctrl.updateById)
router.patch('/:contactId/active', validation(updateFavoriteJoiSchema), ctrl.updateActive)


module.exports = router
