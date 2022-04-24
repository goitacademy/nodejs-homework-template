const { Router } = require('express');
const CreateError = require('http-errors');

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require('../../models/contacts');
const {
  serializeContactResponce,
  serializeContactsListResponce,
} = require('./serialize');

const {
  reqValidateMid,
  contactSchema,
  updateContactSchema,
} = require('./validation');

const router = Router();

// CRUD - C

router.post('/', reqValidateMid(contactSchema), async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).send(serializeContactResponce(contact));
  } catch (error) {
    next(error);
  }
});

// CRUD - R

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).send(serializeContactsListResponce(contacts));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) {
      next(new CreateError.NotFound('Contact not found'));
      return;
    }
    res.status(200).send(serializeContactResponce(contact));
  } catch (error) {
    next(error);
  }
});

// CRUD - U

router.put(
  '/:id',
  reqValidateMid(updateContactSchema),
  async (req, res, next) => {
    try {
      const contact = await updateContact(req.params.id, req.body);
      res.status(200).send(serializeContactResponce(contact));
    } catch (error) {
      next(error);
    }
  },
);

// CRUD - D

router.delete('/:id', async (req, res, next) => {
  try {
    const isContactDeleted = await removeContact(req.params.id);
    if (!isContactDeleted) {
      next(new CreateError.NotFound('Contact not found'));
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
