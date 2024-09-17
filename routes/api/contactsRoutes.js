const { Router } = require('express');

const { createContact, getAllContacts, getOneContact, updateContact, deleteContact } = require('/controllers/contactController');
const { checkContactId } = require('/Middlewares/contactMiddlewares');

const router = Router();

/**
 * CRUD = create read update delete
 *
 * REST API =================================
 * POST       /Contacts            - create Contact
 * GET        /Contacts            - get all Contacts
 * GET        /Contacts/<ContactID>   - get one Contact by id
 * PUT/PATCH  /Contacts/<ContactID>   - update Contact by id
 * DELETE     /Contacts/<ContactID>   - delete Contact by id
 */

// router.post('/', createContact);
// router.get('/', getAllUContact);
// router.get('/:id', checkContactId, getOneContact);
// router.patch('/:id', checkContactId, updateContact);
// router.delete('/:id', checkContactId, deleteContact);

router
  .route('/')
  .post(createContact)
  .get(getAllContacts);

router.use('/:id', checkContactId);
router
  .route('/:id')
  .get(getOneContact)
  .patch(updateContact)
  .delete(deleteContact);

module.exports = router;