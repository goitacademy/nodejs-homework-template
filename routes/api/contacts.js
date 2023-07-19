const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { listContacts } = require('./contacts.js');
const fs = require("fs").promises;
const path = require("node:path");

const router = express.Router();

const list  = async () => {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-GOITgoit-node-hw-01",
    dir: "db",
    base: "contacts.json"
  });
  fs.readFile(contactsPath)
    .then((data) => {
        console.log(data.toString())
        return data;
    })
    .catch((error) => {
      console.log("error:");
      console.log(error.message);
    });
}

const tasks = [
  {
    id: uuidv4(),
    title: 'Work',
    text: 'Do it!',
    done: false,
  },
];

router.get('/', (req, res, next) =>{
  res.json({
    status: 'succes',
    code: 200
  })
})

router.get('/tasks', (req, res, next) => {
  res.json({
    status: 'succes',
    code: 200,
    data: {
      tasks,
    },
  });
});

router.get('/api/contacts', async (req, res, next) => {
  console.log(listContacts());
  res.json({
    message: 'succesu',
    status: 'successu',
    statusText: 'successu',
    code: 200,
    data: list()
  });

})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router;
