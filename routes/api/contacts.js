const express = require('express');
const router = express.Router();
const { Contact } = require('../../models/contacts');

const {
  validateAddedContact,
  validateUpdatedContact,
} = require('../../middlewares/validation');

router.get('/', async (req, res) => {
  const contactsList = await Contact.find();
  if (!contactsList) {
    res.status(500).json({ success: false });
  }
  res.send(contactsList);
});

router.get('/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(500).json({ message: 'Contact with the given ID was not found !' });
  }
  res.status(200).json(contact);
});

router.post('/', validateAddedContact, async (req, res) => {
  let contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite
  })
  contact = await contact.save();

  if (!contact)
    return res.status(400).send('the contact cannot be created!')

  res.send(contact);
});

router.delete('/:id', async (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(contact => {
      if (contact) {
        return res.status(200).json({ message: 'the contact is deleted!' });
      } else {
        return res.status(404).json({ message: "contact was not found!" });
      }
    }).catch(err => {
      // обработка ошибки - если не придерживаться id-формата mongodb - сработает catch
      return res.status(500).json({ error: err });
    })

});

router.put('/:id', validateUpdatedContact, async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite
    }, {
    // для того, чтобы вернуть новые данные 
    new: true
  })

  if (!contact)
    return res.status(400).send('the contact cannot be updated!')

  res.send(contact);
});


router.patch('/:id/favorite', async (req, res) => {
  try {
    if (!req.body.favorite) {
      res.status(400).send('missing field favorite');
    }
    else {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
          favorite: req.body.favorite
        }, {
        new: true
      })
      res.send(contact);
    }
  } catch (err) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
