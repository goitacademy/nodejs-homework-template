const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../model/index');

const {HttpCode} = require('../helpers/constans')

const getAllContacts = async (req, res, next) => {
  try {
    const userID = req.user.id
     const contacts  = await listContacts(userID, req.query);
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        ...contacts
      }
    })

  } catch (error) {
    next(error)
  }
}

const getOneContact = async (req, res, next) => {
  try {
    const userID = req.user.id
    const contact  = await getContactById(userID, req.params.contactId);
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
}

const addNewContact = async (req, res, next) => {
  try {
    const userID = req.user.id
    const contact = await addContact(req.body,userID )
    if (contact)
    {
      res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contact
      }
    })}
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

}

const deleteContact = async (req, res, next) => {
  try {
    const userID = req.user.id
    const contact  = await removeContact(userID,  req.params.contactId);
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
}

const updateOneContact =  async (req, res, next) => {
  try {
    const userID = req.user.id
    const contact  = await updateContact(userID, req.params.contactId, req.body);
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
}

module.exports = {
    getAllContacts,
    getOneContact,
    addNewContact,
    deleteContact,
    updateOneContact
}
