const express = require('express');
const crypto = require('crypto');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const Joi = require('joi');
const router = express.Router()

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

// Route Get
router.get('/', async (req, res, next) => {
try {
  const data = await listContacts();
 res.status(200).json(data);  // Отправляем результат клиенту
} catch (error) {
  console.error(error);
  res.status(500).json({message: 'Internal Server Error'});
}
})

// Route Get
router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
    console.log('Contact ID:', contactId);
    const contact = await getContactById(contactId);

   if(contact){
    res.status(200).json(contact)
   } else {
    res.status(404).json({message: "Not found"})
    next()
   }
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Internal Server Error'});
  }
})

// Route Post
router.post('/', async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ message: "Missing required name field" });
      return; // Выход из функции после отправки ошибки
    }

    const newContact = {
      id: crypto.randomUUID(),
      ...value,
    };

    const addNewContact = await addContact(newContact);

    if (addNewContact) {
      res.status(201).json(addNewContact);
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route Delete
router.delete('/:contactId', async (req, res, next) => {
try {
  const contactId = req.params.contactId;
  const remove = await removeContact(contactId);
 
  if(remove){
   res.status(200).json({"message": "contact deleted"})
  }else{
   res.status(404).json({"message": "Not found"})
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
}
})

// Route Update
router.put('/:contactId', async (req, res, next) => {
try {
  const contactId = req.params.contactId;
  const { error, value } = schema.validate(req.body);  // Проверка, соответствует ли запрос схеме
  if (error) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const update = await updateContact(contactId, value);
    if (update) {
      res.status(200).json(update);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }

} catch (error) {
  console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}

})

module.exports = router
