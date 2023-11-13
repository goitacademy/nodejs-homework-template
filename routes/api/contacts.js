import express from 'express';

import contactsController from '../../controllers/contactsController.js';

import isEmptyBody from '../../middlewares/isEmptyBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post('/', isEmptyBody, contactsController.add);

contactsRouter.put('/:contactId', isEmptyBody, contactsController.updateById);

contactsRouter.delete('/:contactId', contactsController.deleteById);

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
