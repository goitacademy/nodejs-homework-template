const express = require("express");
const {
  getAllContacts,
  getContact,
  deleteContact,
  addNewContact,
  updatedContact,
} = require("../../controllers/contactControllers");

const router = express.Router();

router.route("/").get(getAllContacts).post(addNewContact);
router
  .route("/:contactId")
  .get(getContact)
  .delete(deleteContact)
  .put(updatedContact);

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
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

module.exports = router;
