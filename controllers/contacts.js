const express = require('express')
const contacts= require("../models/contacts")
const addSchema = require("../schemas/contactSchema")

const {HttpError} = require("../helpers/index")

  const getAll = async (req, res, next) => {
    try {
      const result = await contacts.listContacts()
      res.json(result)
      // console.table(result)
    } catch (error) {
    next(error) //Express ищет не простo следующий обработчик, а именнo обработчик ошибок. В нашем случае это хранщаяся в файле app.js последняя middleware  
    } }

    const getContactById = async (req, res, next) => {
        try {
      const {contactId} = req.params;
      console.log(req.params)
      const result = await contacts.getContactById(contactId)
      if(!result){
        throw HttpError(404,"Not Found");
      }
      
      res.json(result)
      
        } catch (error) {
          next(error) 
        }
      }

const addContact= async (req, res, next) => {
    try {
  
  const {error} = addSchema.validate(req.body) //проверяем на соответствие требованиям, указанным в схеме
  console.log("error:", error)
  
  if(error){ // если по схеме ошибка в получаемых данных, то выбрасываем ошибку
    throw HttpError(400,error.message)
  }
      console.log(req.body)
      console.log(req.params)
  // console.log(req.)

      const result = await contacts.addContact(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)  
    }
  }

  const deleteContact = async (req, res, next) => {
    try {
      const {contactId} = req.params
      const result = await contacts.deleteContact(contactId)
      console.log(result)
      if(!result){ //если результат null 
        throw HttpError(404,"Not Found");
      }
      res.json({
        message: "Delete success"
      })
      console.table('result', result); 
    } catch (error) {
      next(error)  
    }
}


const updateContact = async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body) 
      console.log("req.params:", req.params)
      console.log("error:", error)
      if(error){ 
        throw HttpError(400,error.message)
      }
          const {contactId} = req.params
          const result = await contacts.updateContact(contactId, req.body)
          if(!result){ //если результат null т.е. нет книги стаким id
            throw HttpError(404,"Not Found");
          }
          res.json(result)
          console.log('result', result); 
          } catch (error) {
            next(error)  
    }
  }

    module.exports={
        getAll,  getContactById, addContact, deleteContact, updateContact, 
    }