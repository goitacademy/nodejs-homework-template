const express = require('express')

const Joi = require('joi')

const {nanoid} = require("nanoid");

const router = express.Router()


const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})
 
const path = require('path')

const fs = require('fs/promises');

const contactsPath = path.join('models', 'contacts.json');


const getAll = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

router.get("/", async(req, res)=> {
  try {
      const contacts = await getAll()
      res.json(contacts);
      res.status(200)
    }
    catch(error) {
        console.log(error)
    }
})


router.get('/:contactId', async (req, res, next) => {
   
    const contacts = await getAll()
    const { contactId } = req.params;
    const result = contacts.find(item => item.id === contactId);
    if (!result) { 
      res.status(404).json("Not found")
    }
    res.json(result)
  }
)

router.post('/', async (req, res, next) => {
  try {
    const contacts = await getAll()
    const { error } = addSchema.validate(req.body)
    if (error) {
      res.status(400).json(error.message)
    }
    const newContact = {
      id: nanoid(),
      ...req.body,
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
     res.status(201).json(newContact)
    }
  catch (error) { 
    next(error)
}}
)

router.delete('/:contactId', async (req, res) => {
  try {
    const contacts = await getAll();
    const { contactId } = req.params;

    const removeContact = async (contactId) => {
      const index = contacts.findIndex(item => item.id === contactId);
      if (index === -1) {
        return null;
      }
      const [result] = contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return result;
    };

    const deletedContact = await removeContact(contactId);
    if (!deletedContact) {
      res.status(404).json({ "message": "Контакт вже видалено" });
    } else {
      res.json({ message: 'Контакт видалено' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/:contactId', async (req, res) => {
  const body = req.body;
  const { error } = addSchema.validate(body);

  if (error) {
    res.status(400).json(error.message);
  }

  if (!body) {
    res.status(400).json({ "message": "відсутні поля" });
  }

  const updateContact = async (body) => {
    const { contactId } = req.params;
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === contactId);

    if (index === -1) {
      return null;
    }

    contacts[index] = { contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  };

  const updatedContact = await updateContact(body);

  if (!updatedContact) {
    res.status(404).json({ "message": "відсутні поля" });
  } else {
    res.status(200).json(updatedContact);
  }
});

module.exports = router
