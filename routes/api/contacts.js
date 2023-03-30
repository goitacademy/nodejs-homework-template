const express = require('express')

<<<<<<< Updated upstream
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})
=======
const { catchAsync } = require("../../utils");
const contactsController = require("../../controllers");
const {
  checkContactId,
  checkCreateContactData,
  checkUpdateContactData,
} = require("../../middlewares");
const router = express.Router();

router
  .route("/")
  .get(catchAsync(contactsController.getAll)) 
  .post(checkCreateContactData, catchAsync(contactsController.addItem)); 

router.use("/:contactId", checkContactId);
router
  .route("/:contactId")
  .get(catchAsync(contactsController.getById)) 
  .delete(catchAsync(contactsController.deleteById)) 
  .put(checkUpdateContactData, catchAsync(contactsController.updateById));

router
  .route("/:contactId/favorite")
  .patch(checkContactId, catchAsync(contactsController.updateFavoriteById));
>>>>>>> Stashed changes

module.exports = router
