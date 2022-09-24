const fs = require('fs/promises');
const uniqid = require('uniqid');
const Joi = require('joi');

const validateBody = (body) => {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    phone: Joi.string()
      // .pattern(new RegExp('^[0-9]{3,30}$'))
      .min(7)
      .max(15)
      .required(),
  })
  return schema.validate(body);
}

const listContacts = async (req,res) => {
  fs.readFile('./models/contacts.json')
    .then(data => {
      res.json({
          status: 'success',
          code: 200,
          data: JSON.parse(data),
        })
    })
    .catch(err => console.log(err.message));
}

const getContactById = async (req, res) => {
  fs.readFile('./models/contacts.json')
    .then(data => {
      const { id } = req.params;
      const answer = JSON.parse(data).filter(contact => contact.id === id);
      if (answer.length !== 0) {
          res.json({
            status: 'success',
            code: 200,
            data: answer,
          })
      } else {
          res.json({
            code: 404,
            message: "Not found"
          })
      }
      
    })
    .catch(err => console.log(err.message));
}

const addContact = async (req, res) => {
  fs.readFile('./models/contacts.json')
    .then(data => {
      if (validateBody(req.body).error) {
        return res.status(400).json({status: validateBody(req.body).error})
      }
      const { name, email, phone } = req.body;
      const newContact = { id: uniqid(), name, email, phone };
      fs.writeFile('./models/contacts.json', JSON.stringify([...JSON.parse(data), newContact]), 'utf8')
        .then(() => console.log(`Contact was added`))
        .catch(console.error);
      res.json({
        status: 'success',
        code: 201,
        data: newContact,
      })
    })
    .catch(err => console.log(err.message));
}

const removeContact = async (req, res) => {
  fs.readFile('./models/contacts.json')
    .then(data => {
      const { id } = req.params;
      const answer = JSON.parse(data).filter(contact => contact.id !== id);
      if (answer.length !== JSON.parse(data).length) {
          fs.writeFile('./models/contacts.json', JSON.stringify(answer), 'utf8')
          .then(() => console.log(`Contact was deleted`))
          .catch(console.error);
          res.json({
            status: 'success',
            code: 200,
            message: "contact deleted",
          })
      } else {
          res.json({
            code: 404,
            message: "Not found"
          })
      }
      
    })
    .catch(err => console.log(err.message));
}

const updateContact = async (req, res) => {
  fs.readFile('./models/contacts.json')
    .then(data => {
      if (validateBody(req.body).error) {
        return res.status(400).json({status: validateBody(req.body).error})
      }
      const { id } = req.params;
      const { name, email, phone } = req.body;
      const contact = JSON.parse(data).filter(contact => contact.id === id);
      if (contact.length !== 0) {
        contact[0].name = name;
        contact[0].email = email;
        contact[0].phone = phone;

        fs.writeFile('./models/contacts.json', JSON.stringify([...JSON.parse(data).filter(contact => contact.id !== id), contact]), 'utf8')
        .then(() => console.log(`Contact was changed`))
        .catch(console.error);
        res.json({
          status: 'success',
          code: 201,
          data: contact,
        })
      } else {
          res.json({
            code: 404,
            message: "Not found"
          })
      }
      
    })
    .catch(err => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
