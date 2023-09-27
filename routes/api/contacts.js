import { Router } from 'express';
import * as contactServises from '../../models/contacts.js';
import * as controllersContact from '../../controlers/controllersContacts.js';
const router = Router();

router.get('/', controllersContact.getAll);

router.get('/:contactId', controllersContact.getById);

router.delete('/:contactId', controllersContact.deleteById);

router.post('/', controllersContact.add);

router.put('/:contactId', async (req, res, next) => {
  res.json(await contactServises.updateContact(id, reg.body));
});

export default router;
