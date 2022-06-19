const express = require('express');
const Contacts = require('../../models/contacts');
const { schema } = require('../../validator');

const router = express.Router();



router.get('/', async (req, res, next) => {
  const base = await Contacts.find();
  res.status(200).json(base);
})

router.get('/:contactId', async (req, res, next) => {
  const data = await Contacts.findById(req.params.contactId);
  if (data) {
    res.status(200).json({ data });
  } else {
    res.status(400).json({ message: "Not found" });
  }
  
});

router.post('/', async (req, res, next) => {
 
  const { error } = await schema.validate(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(201).json(await Contacts.create(req.body));
});

router.delete('/:contactId', async (req, res, next) => {
  const data = await Contacts.findByIdAndRemove(req.params.contactId);
 
  if (data) {
    res.status(200).json({ message: "contakt deleted", data });

  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const body = req.body;
  const{ error } = await schema.validate(body);
  if (error) {
    return res.status(400).json(error);
  }
  const data = await Contacts.findByIdAndUpdate(req.params.contactId, body, { new: true});
  if (data) {
    return res.status(200).json(data);

  }
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
