const express = require('express')
const router = express.Router()
// or like that it's same
// const {Router} =require('express');
// const router = Router();

// const {
//   getAll,
//   getById,
//   addById,
//   deleteById,
//   updateById,
// } = require("../../controllers/index");

// router.get('/', getAll);
// router.get('/:contactId', getById);
// router.post('/', addById);
// router.delete('/:contactId', deleteById);
// router.put('/:contactId', updateById);
router.get('/', async (req, res, next) => {
  res.json({ message: 'Get Hello World!' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'Get ID Hello World!' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'Post Hello World!' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'Delete Hello World!' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'Put Hello World!' })
})

module.exports = router
