const express = require('express');
const router = express.Router();
// const Contacts = require('../../model/contacts');
const { MongoClient, ObjectID } = require('mongodb');
// const db = require('../../model/db');
require('dotenv').config();
const uriDb = process.env.DB_HOST;

router.get('/', async (_req, res, next) => {
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect();

  try {
    const contacts = await client.db().collection('contacts').find().toArray();
    console.log('contacts', contacts);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  } finally {
    await client.close();
  }
});

router.get('/:contactId', async (req, res, next) => {
  const objectId = new ObjectID(req.params.contactId);

  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect();

  try {
    const contact = await client
      .db()
      .collection('contacts')
      .find({ _id: objectId })
      .toArray();
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  } finally {
    await client.close();
  }
});

router.post('/', async (req, res, next) => {
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect();
  try {
    const {
      ops: [contact],
    } = await client.db().collection('contacts').insertOne(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  } finally {
    await client.close();
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect();
  try {
    // const contact = await Contacts.removeContact(req.params.contactId);

    const { value: contact } = await client
      .db()
      .collection('contacts')
      .findOneAndDelete({ _id: req.params.contactId });
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  } finally {
    await client.close();
  }
});

router.patch('/:contactId', async (req, res, next) => {
  const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,
  }).connect();
  try {
    // const contact = await Contacts.updateContact(
    //   req.params.contactId,
    //   req.body
    // );

    const { value: contact } = await client
      .db()
      .collection('contacts')
      .findOneAndUpdate(
        { _id: req.params.contactId },
        { $set: req.body },
        { returnOriginal: false }
      );
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  } finally {
    await client.close();
  }
});

module.exports = router;
