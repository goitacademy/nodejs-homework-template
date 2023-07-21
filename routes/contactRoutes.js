const { Router } = require('express');

const {
  createContact,
  getAllContacts,
  getOneContact,
  updateContact,
  removeContact,
  updateStatus,
} = require('../controllers/contacts');

const {
  checkContactId,
  checkCreateContactData,
  checkBoolean,
} = require('../middlewares/contactMiddlewares');

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
  .post(checkCreateContactData, createContact)
  .get(getAllContacts);

router.use('/:id', checkContactId);
router
  .route('/:id')
  .get(getOneContact)
  .patch(updateContact)
  .delete(removeContact);

router.use('/:id/favorite', checkContactId, checkBoolean);
router.route('/:id/favorite').patch(updateStatus);

module.exports = router;
