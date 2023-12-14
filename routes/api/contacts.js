const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');




const router = express.Router()


router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      contacts: contacts,
    })
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})



router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    res.status(200).json({
      contact,
    })
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})



router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const newUser = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const newContact = await addContact(newUser);
    await fs.writeFile('./models/contacts.json', JSON.stringify(newContact));

    res.status(201).json({
      mes: 'Success',
      user: newUser,
    })
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})



router.delete('/:contactId', async (req, res, next) => {
  try {

    const { contactId } = req.params;
    const { contacts, delCont } = await removeContact(contactId);


    fs.writeFile('./models/contacts.json', JSON.stringify(contacts), err => {
      // error checking
      if (err) throw err;
    });

    return res.status(201).json({
      message: 'Success',
      delCont,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})



router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const newUser = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const contacts = await updateContact(contactId, newUser);
    await fs.writeFile('./models/contacts.json', JSON.stringify(contacts));


    res.status(201).json({
      mes: 'Success',
      user: newUser,
    })
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})


module.exports = router
