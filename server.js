const express = require('express');
const cors = require('cors');

const { createContact, getContact, findContact, deleteContact, removeContact } = require('./controllers/contactController');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/api/contacts', getContact);

app.get('/api/contacts/:id', findContact);

app.post('/api/contacts', createContact);

app.delete('/api/contacts/:id', deleteContact);

app.put('/api/contacts/:id', removeContact);

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`)
});