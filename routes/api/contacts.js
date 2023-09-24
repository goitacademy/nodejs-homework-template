import express from 'express';
const router = express.Router();

console.log('router', router);
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
