const { NotFound, BadRequest } = require('http-errors');
const { Contact } = require('../models/contacts');
const path = require('path');
const fs = require('fs/promises');

PORT = process.env.PORT || 3000;

async function getContacts(req, res, next) {
  const {
    limit = 20,
    page = 1,
    favorite = [true, false],
    search = '',
  } = req.query;
  // const search = req.query.search || ''; // example
  // .find({name: { $regex: search, $options: 'i' },}) // example
  const skip = (page - 1) * limit;
  return res.status(200).json(
    await Contact.find({ favorite, name: { $regex: search, $options: 'i' } })
      .skip(skip)
      .limit(limit)
  ); // example: 127.0.0.1:3000/api/contacts?page=4&limit=3
}

async function getContact(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw NotFound(`Contact with <${id}> not found`);
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const newContact = await Contact.create(req.body);

  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    throw NotFound(`Contact with <${id}> not found`);
  }
  return res
    .status(200)
    .json({ message: `Contact with name <${contact.name}> has been deleted` });
}

async function changeContact(req, res, next) {
  const { id } = req.params;
  if (!req.body) {
    throw BadRequest(`Missing field body`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    throw NotFound(`Contact with <${id}> not found`);
  }
  return res.status(200).json(result);
}

async function updateStatusContact(req, res, next) {
  const { id } = req.params;
  if (!req.body) {
    throw BadRequest(`Missing field favorite`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    throw NotFound(`Contact with <${id}> not found`);
  }
  return res.status(200).json(result);
}

// add contact image
async function uploadImageContact(req, res, next) {
  // req.file
  console.log('req.file ', req.file);
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, '../tmp', filename);
  const publicPath = path.resolve(__dirname, '../public/images', filename);

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }

  const contactId = req.params.id;

  // const contact = await Contact.findByIdAndUpdate(
  //   contactId,
  //   { image: publicPath },
  //   { new: true }
  // );

  // const imagePath = `/public/images/${filename}`;
  const contact = await Contact.findById(contactId);
  contact.image = `http://127.0.0.1:${PORT}/public/images/${filename}`; // http/127.0.0.1/public/images/${filename}
  await contact.save();

  return res.status(200).json({ data: { image: contact.image } }); // TODO change to array
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  updateStatusContact,
  uploadImageContact,
};
