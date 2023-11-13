import express from 'express';

import contactsController from '../../controllers/contactsController.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post('/', contactsController.add);

// router.post('/', async (req, res, next) => {
// 	res.json({ message: 'template message' });
// });

// router.delete('/:contactId', async (req, res, next) => {
// 	res.json({ message: 'template message' });
// });

// router.put('/:contactId', async (req, res, next) => {
// 	res.json({ message: 'template message' });
// });

export default contactsRouter;
