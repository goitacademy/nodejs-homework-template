const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContactById);

module.exports = router;
