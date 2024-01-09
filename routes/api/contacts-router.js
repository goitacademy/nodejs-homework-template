import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";
// import { contactAddSchema, contactUpdateSchema, contactUpdateFavoriteSchema } from "../../models/Contact.js";


const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:id', isValidId, contactsControllers.getById);

contactsRouter.post('/', isEmptyBody, contactsControllers.add);

contactsRouter.put('/:id',isValidId, isEmptyBody, contactsControllers.updateById);

contactsRouter.delete('/:id', isValidId, contactsControllers.deleteById);

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBody,contactsControllers.updateById);

export default contactsRouter;


// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router
