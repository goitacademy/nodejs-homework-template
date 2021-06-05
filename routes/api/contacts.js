import express from 'express';
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.json({ message: 'template message' });
});

router.get('/:contactId', async (req, res, next) => {
    res.json({ message: 'template message' });
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
