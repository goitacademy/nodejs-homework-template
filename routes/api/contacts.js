const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model/index');

const {HttpCode} = require('../../helpers/constans')

router.get('/', async (req, res, next) => {
  try {
     const contacts  = await listContacts();
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts
      }
    })

  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact  = await getContactById(req.params.contactId);
   if (contact) {
     res.status(HttpCode.OK).json({
     status: 'success',
     code: HttpCode.OK,
     data: {
       contact,
     }}) }
     else {
       return next ({
         status: HttpCode.NOT_FOUND,
         message: 'Not found contact',
         data: 'Not Found'
       })
     }
 } catch (error) {
   next(error)
 }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, email, phone} = req.body;
    if (name && email && phone )
    {const contact = await addContact(req.body)
      res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contact
      }
    })}
      else  {
      if (!name)
      {return next ({
        status: HttpCode.NOT_FOUND,
        message: `missing required name field`,
        data: 'Not Found'
      })}
      if (!email)
      {return next ({
        status: HttpCode.NOT_FOUND,
        message: `missing required email field`,
        data: 'Not Found'
      })}
      if (!phone)
      {return next ({
        status: HttpCode.NOT_FOUND,
        message: `missing required phone field`,
        data: 'Not Found'
      })}
    }
 } catch (error) {
   next(error)
 }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact  = await removeContact(req.params.contactId);
   if (contact) {
    return res.status(HttpCode.OK).json({
     status: 'success',
     code: HttpCode.OK,
     message:"contact deleted",
     /*data: {
       contact,
     }*/}) }
     else {
       return next ({
         status: HttpCode.NOT_FOUND,
         message: 'Not found contact',
         data: 'Not Found'
       })
     }
 } catch (error) {
   next(error)
 }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const contact  = await updateContact(req.params.contactId, req.body);
   if (contact) {
    return res.status(HttpCode.OK).json({
     status: 'success',
     code: HttpCode.OK,
     data: {
       contact,
     }}) }
     else {
       return next ({
         status: HttpCode.NOT_FOUND,
         message: 'missing fields',
         data: 'Not Found'
       })
     }
 } catch (error) {
   next(error)
 }
})

module.exports = router
