const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');




const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await fs.readFile('./models/contacts.json')
    const parse = JSON.parse(contacts);
    res.status(200).json({
      contacts: parse,
    })
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await fs.readFile('./models/contacts.json')
    const parse = JSON.parse(contacts);
    const contact = parse.find((item) => item.id === contactId)
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
    const contacts = await fs.readFile('./models/contacts.json')
    const parse = JSON.parse(contacts);
    parse.push(newUser);
    await fs.writeFile('./models/contacts.json', JSON.stringify(parse))

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
    const contacts = await fs.readFile('./models/contacts.json');
    const parse = JSON.parse(contacts);

    const index = parse.findIndex((el) => el.id === contactId);
    if (index !== -1) {
      const removeContact = parse.splice(index, 1);
      const newData = JSON.stringify(parse);
      fs.writeFile('./models/contacts.json', newData, err => {
        // error checking
        if (err) throw err;
      });
      return res.status(201).json({
        message: 'Success',
        removeContact,
      });
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
