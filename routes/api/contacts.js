const express = require('express');
const { getAllContacts, getOneContact, deleteContact, createContact, updateContactById, updateStatusFavourite } = require('../../controller/contactsController');
const {checkCreateUserData, checkUpdateUserData} = require("../../middlewares/contactMiddleware")

const router = express.Router()




router
  .route('/')
  .post(checkCreateUserData, createContact)
  .get(getAllContacts)

router
  .route('/:id')
  .get(getOneContact)
  .patch(checkUpdateUserData, updateContactById)
  .delete(deleteContact)

router
  .route('/:id/favorite')
  .patch(updateStatusFavourite)
module.exports = router
