const express = require('express')
const {
  listController,
  getByIdController,
  addController,
  removeController,
  updateControllers,
} = require("../../controllers");

const router = express.Router();
const ctrlWrapper = require('../../middlewares/ctrWrapper')

router.get("/", ctrlWrapper(listController));
router.get("/:id", ctrlWrapper(getByIdController));
router.post("/", ctrlWrapper(addController));
router.delete("/:id", ctrlWrapper(removeController));
router.put("/:id", ctrlWrapper(updateControllers));
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

module.exports = router
