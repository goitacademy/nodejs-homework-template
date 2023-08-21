// const { Router } = require('express');

// const router = Router();

// router.get('/') 



const express = require('express')

const contacts = require("/node.js.home-work/nodejs-homework-rest-api/models/contacts")

const { HttpError } = require("../../helpers");

const router = express.Router()

const {
  getAllContacts,
  getOneContact,
  postContact,
  deleteContact,
  putContact,
} = require('../../controllers/cotactControllers');//=

router.get('/',  getAllContacts, async (req, res, next) => {
  const result = await contacts.getAll
  res.json({ message: 'Not found' })
})//=

router.get('/:contactId', getOneContact, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById;
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  }
  catch (error) {
    next
  }

  // res.json({ message: 'template message' })
}) //=

router.post('/', postContact, async (req, res, next) => {
  res.json({ message: 'template message' })
})//=

router.delete('/:contactId', deleteContact, async (req, res, next) => {
  res.json({ message: 'template message' })
})//=

router.put('/:contactId', putContact, async (req, res, next) => {
  res.json({ message: 'template message' })
})//=

module.exports = router; //=
