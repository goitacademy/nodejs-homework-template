const express = require('express')

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

<<<<<<< Updated upstream
router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})
=======
router.put("/:contactId", service.updateContact);
router.patch(
  "/:contactId/favorite", service.updateFavoriteToContact);
>>>>>>> Stashed changes

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
