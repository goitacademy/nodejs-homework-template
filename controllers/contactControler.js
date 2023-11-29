const Contact = require('../models/contactModel')
  
const catchAsync = require("../utils/catchAsync")
const {joiUserValidator} = require('../utils/joiValidator')



exports.getContact = async (req, res) => {
        try {
      
          const dataContacts = await Contact.find({owner: req.user})
      
          res.status(200).json({
            msg: "success",
            dataContacts
          })
          
        } catch (error) {
          console.log(error)
        }
       
    }

exports.getContactId = async (req, res) => {
    try {
      const { contactId } = req.params;

      
      const findContact = await Contact.findOne({_id: contactId, owner: req.user})
    
      if(findContact) {
        return res.status(200).json({
          msg: 'good',
          findContact
        })
      } else {
        return res.status(404).json({
          message: "Not found"
        })
      }
    } catch (error) {
      console.log(error.messenge)
    }
  
    }

exports.postContact = async (req, res) => {

  try {
    const {name, email, phone} = req.body

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "missing required name field"
      })
    }   
    const createNewContact = await Contact.create({...req.body, owner: req.user});
    
    if (!createNewContact) {
      return res.status(400).json({
        message: "missing required try agen"
      })
    }
  
    res.status(201).json(
      createNewContact
    )
  
  } catch (error) {
    console.log(error.messenge)
  }
  
    
    }

exports.deleteContact = async (req, res) => {
    try {
      const { contactId } = req.params;
  
      const remove =  await Contact.findByIdAndDelete(contactId)
    
      if(remove) {
        return res.status(200).json({
          message: "contact deleted"
        })
      } else {
        return res.status(404).json({
          message: "Not found"
        })
      }
    
    } catch (error) {
      console.log(error.messenge)
    }
  
    }

exports.putContacts = async (req, res, next) => {

    const  { error, value }  = await joiUserValidator(req.body)
  
  
    if (error) {
      return res.status(400).json({
        message: "missing required name field"
      })
    }
  
    const {contactId} = req.params;
    const body = value
  
    if (!body) {
      return res.status(400).json({
        "message": "missing fields"
      })
    }
  
    const updCont = await Contact.findByIdAndUpdate(contactId, body, {new: true})
  
    if (!updCont) {
      return res.status(404).json({
        message: "Not found"
      })
    }
  
    res.status(200).json(updCont)
     }