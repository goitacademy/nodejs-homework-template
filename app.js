const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());


const contactsPath = path.join(__dirname, 'contacts.json');


const readContactsFile = () => {
    const data = fs.readFileSync(contactsPath, 'utf8');
    return JSON.parse(data);
};

const writeContactsFile = (data) => {
    fs.writeFileSync(contactsPath, JSON.stringify(data, null, 2), 'utf8');
};


app.get('/api/contacts', (req, res) => {
    try {
        const contacts = readContactsFile();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/contacts/:id', (req, res) => {
    try {
        const contacts = readContactsFile();
        const contact = contacts.find(c => c.id === req.params.id);
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/contacts', (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'missing required fields' });
        }
        const contacts = readContactsFile();
        const newContact = { id: Date.now().toString(), name, email, phone };
        contacts.push(newContact);
        writeContactsFile(contacts);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
