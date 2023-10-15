const contacts = require('../../models/contacts')

const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  try{
    const result = await contacts.listContacts();
    return res.status(200).json(result)

  } catch(error){
    res.status(500).json({message: "server error"})
  }


})

router.get('/:id', async (req, res, next) => {
  try{
    console.log(req.params);
    const {id} = req.params;
    const result = await contacts.getContactById(id)
    res.status(200).json(result)
  }
  catch(error){
    res.status(500).json({message: "server error"})
  }
})

router.post('/', async (req, res, next) => {
  try{
    const {name, email, phone} = req.body;
    const result = await contacts.addContact(name, email, phone)
    res.status(201).json(result)
  }
  catch(error){
   next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const result = await contacts.removeContact(id)
    res.status(200).json(result)
    }
    catch(error){
     next(error)
    }
})

router.put('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateById(id, name, email, phone)
    res.status(200).json(result)
    }
    catch(error){
     next(error)
    }
})

module.exports = router