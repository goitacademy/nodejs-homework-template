const express = require('express')
const { contact } = require("../../../controllers");
const { add,
  getById,
  getList,
  remove,
  update,
  updateStatus } = contact;
const { checkUpdateContactsData, checkCreateContactsData, checkUpdateFavoriteContactsData } = require('../../../middlewares/contact/contactMiddleware');
const { protect } = require("../../../middlewares/user/userMiddleware");

const router = express.Router()

router.use(protect);

router
  .route('/')
  .post(checkCreateContactsData, add)
  .get(getList);


router
  .route('/:contactId')
  .get(getById)
  .patch(checkUpdateContactsData, update)
  .delete(remove);

router
  .route('/:contactId/favorite')
  .patch(checkUpdateFavoriteContactsData, updateStatus)

module.exports = router



// router.get('/', async (req, res, next) => {
//   const result = await contacts.listContacts();
//   res.json(result)
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
