// ./routes/contacts/contactRoutes.js

const { Router } = require('express');

const controllers = require('../../controllers/contacts');

const middleware = require('../../middlewares/contacts');

const router = Router();

/**
 * CRUD = create read update delete
 *
 * REST API =================================
 * POST       /contacts            - create contact
 * GET        /contacts            - get all contacts
 * GET        /contacts/<contactID>   - get one contact by id
 * PUT/PATCH  /contacts/<contactID>   - update contact by id
 * DELETE     /contacts/<contactID>   - delete contact by id
 */

router
  .route('/')
  .post(middleware.checkCreateContactData, controllers.createContact)
  .get(controllers.getAllContacts);

router.use('/:id', middleware.checkContactId);
router
  .route('/:id')
  .get(controllers.getOneContact)
  .patch(controllers.updateContact)
  .delete(controllers.removeContact);

router.use('/:id/favorite', middleware.checkContactId, middleware.checkBoolean);
router.route('/:id/favorite').patch(controllers.updateStatus);

module.exports = router;
