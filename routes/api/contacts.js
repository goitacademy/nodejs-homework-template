// import express from 'express';
import { Router } from 'express';
const router = Router();
// const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('req', req);
  res.send('<h2>Home</h2>');
  // res.json({ message: 'template message' });
});

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

export default router;
