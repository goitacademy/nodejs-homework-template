const express = require('express');

const router = express.Router();

const cntrl = require('../../controllers/contacts')

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');


router.get('/', cntrl.getAll)

router.get('/:contactId', cntrl.getById)

router.post('/', validateBody(schemas.addSchema), cntrl.add)

router.delete('/:contactId', cntrl.deleteById)

router.put('/:contactId', validateBody(schemas.addSchema), cntrl.updateById)
  


module.exports = router
