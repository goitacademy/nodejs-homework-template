const express = require('express');
const router = express.Router()
const {
  getContacList,
  getContact,
  addNewContact,
  deleteContact,
  changeContact 
} = require("../../controlers/taskControlers");

const {
  addDataValid,
  updateDataValid
} = require('../../dataValidation/dataValidation');


router.get('/', getContacList);

router.get('/:contactId', getContact);

router.post('/',addDataValid, addNewContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId',updateDataValid, changeContact);

module.exports = router
