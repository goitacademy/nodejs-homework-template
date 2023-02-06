const express = require('express');
const router = express.Router()
const {
  getContacList,
  getContact,
  addNewContact,
  deleteContact,
  changeContact,
  updateStatusContact
} = require("../../controlers/taskControlers");

const {
  addDataValid,
  updateDataValid,
  updateFavoriteValid
} = require('../../dataValidation/dataValidation');


router.get('/', getContacList);

router.get('/:contactId', getContact);

router.post('/',addDataValid, addNewContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId',updateDataValid, changeContact);

router.patch('/:contactId/favorite',updateFavoriteValid, updateStatusContact)

module.exports = router
