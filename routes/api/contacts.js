
import express from 'express';
import Joi from 'joi';
import listContacts  from '../../controllers/listContacts.js';
import  getContactById  from '../../controllers/getContactById.js';
import addContact from '../../controllers/addContacts.js';
import  removeContact  from '../../controllers/removeContacts.js';
import  updateContact  from '../../controllers/updateContact.js';
import  updateStatusContact  from '../../controllers/updateStatusContact.js';


const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const router = express.Router();

router.get('/', (req, res) => {
  listContacts(req, res);
});

router.get('/:id', (req, res) => {
  getContactById(req, res);
});


router.post('/', (req, res) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }


  addContact(req, res);
});

router.delete('/:id', (req, res) => {
  removeContact(req, res);
});

router.put('/:id', (req, res) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  updateContact(req, res);
});

router.patch('/:id/favorite', async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined || typeof favorite !== 'boolean') {
    return res
      .status(400)
      .json({ message: 'Missing or invalid field "favorite"' });
  }

  try {
    const updatedContact = await updateStatusContact(id, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { contact: updatedContact },
    });
  } catch (error) {
    console.error('Error updating contact status:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });

  }

  updateContact(req, res);
});

export default router;
