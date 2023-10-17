const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Joi = require('joi'); 
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require('./models/contacts');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/api/contacts', (req, res) => {
  const contacts = listContacts();
  res.status(200).json(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contact = getById(id);
  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(200).json(contact);
  }
});

app.post('/api/contacts', (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: 'missing required fields' });
  } else {
    const contact = addContact(req.body);
    res.status(201).json(contact);
  }
});

app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const result = removeContact(id);
  if (!result) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(200).json({ message: 'contact deleted' });
  }
});

app.put('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });
  
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: 'missing fields' });
  } else {
    const contact = updateContact(id, req.body);
    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.status(200).json(contact);
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
