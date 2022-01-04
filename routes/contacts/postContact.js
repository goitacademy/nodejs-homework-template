import { Router } from 'express';
import operations from '../../model/operations';
import { validateCreate } from '../../middlewares/contacts/validation';

const router = new Router();

router.post('/', validateCreate, async (req, res, next) => {
    const newContact = await operations.addContact(req.body);
    res.status(201).json(newContact);
});

export default router;