import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';
const contactRouter = express.Router();

contactRouter.get('/', contactsController.getAll);

contactRouter.get('/:id', contactsController.getById);

contactRouter.post('/', contactsController.add);

// contactRouter.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// contactRouter.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

export default contactRouter;
