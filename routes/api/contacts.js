const { Router } = require('express');

const { controller } = require('../../controllers/contacts');
const {
  catchError,
  validateRequest,
} = require('../../helpers/contacts/middlewares');
const { schema } = require('../../helpers/contacts/schemas');
const { model } = require('../../models/contacts');

const router = Router();

// CRUD - C

router.use(
  catchError(async (req, res, next) => {
    req.contacts = await model.getContacts();
    next();
  }),
);
router.post(
  '/',
  validateRequest(schema.contact),
  catchError(controller.addContact),
);
router.get('/', catchError(controller.getContacts));
router.get('/:id', catchError(controller.getContact));
router.put(
  '/:id',
  validateRequest(schema.updateContact),
  catchError(controller.updateContact),
);
router.delete('/:id', catchError(controller.deleteContact));

module.exports = router;
