const express = require('express')
const router = express.Router()
const {
  getContacts,
  getContactById
} = require("../../controllers/getConroller.js");
const {
  addContact
} = require("../../controllers/postController.js")
const {
  deleteContact
} = require("../../controllers/deleteController.js")
const {
  putContact
} = require("../../controllers/putController.js")


router.get('/', async (req, res) => { getContacts(req, res) })

router.get('/:contactId', async (req, res) => {
  getContactById(req,res)
})

router.post('/', async (req, res) => {
  addContact(req,res)
});

router.delete('/:contactId', async (req, res) => {
  deleteContact(req,res)
})

router.put('/:contactId', async (req, res) => {
  putContact(req,res)
})

module.exports = router
