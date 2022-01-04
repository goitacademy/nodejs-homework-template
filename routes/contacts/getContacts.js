import { Router } from 'express';
import operations from '../../model/operations';

const router = new Router();

router.get('/', async (req, res, next) => {
    const contacts = await operations.listContacts();
    res.status(200).json(contacts);
});

export default router;