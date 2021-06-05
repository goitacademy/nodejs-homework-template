import express from 'express';
import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} from '../../model/index.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await listContacts();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:contactId', async (req, res, next) => {
    try {
        const data = await getContactById(req.params.contactId);
        res.json({
            status: 'OK',
            code: res.statusCode,
            data: data,
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res, next) => {
    res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
    res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
    res.json({ message: 'template message' });
});

export default router;
