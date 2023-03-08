import express from 'express';
import mdlw from 'middlewares/contacts.validation';
import ctrl from 'controllers/contacts.controller';

const router = express.Router();

router.get('/', mdlw.getContacts, ctrl.getContacts);
router.post('/', mdlw.addContact, ctrl.addContact);
router
  .route('/:contactId')
  .get(mdlw.getContactById, ctrl.getContactById)
  .delete(mdlw.getContactById, ctrl.deleteContactById)
  .put([mdlw.getContactById, mdlw.updateContact], ctrl.updateContactById);
router.patch('/:contactId/favorite', [mdlw.getContactById, mdlw.updateFavorite], ctrl.updateFavoriteById);

export default router;
