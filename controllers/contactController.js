const Joi = require('joi');
const service = require('../services/contactService');

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
      .min(7)
      .max(15)
      .required(), 
    favorite: Joi.boolean().default(false)
  })
  return schema.validate(body);
}

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5, favorite = null } = req.query;
  const contactsOnPage = parseInt(limit);
  const skip = (parseInt(page) - 1) * contactsOnPage;
  const results = await service.getAllContacts(_id, {skip, contactsOnPage, favorite});
  res.json({
    status: 'success',
    code: 200,
    data: results,
    skip: skip,
    limit: limit,
  }) 
}

const getContactById = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    const results = await service.getContactById(id, _id);
    res.json({
      status: 'success',
      code: 200,
      data: results,
    }) 
}

const addContact = async (req, res) => {
  if (validateBody(req.body).error) {
    return res.status(400).json({status: validateBody(req.body).error})
  }
    const { _id } = req.user;
    const result = await service.createContact(req.body, _id);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    })
}

const removeContact = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    const results = await service.removeContact(id, _id);
    res.json({
      status: 'success',
      code: 200,
      data: results,
    }) 
}

const updateContact = async (req, res) => {
  if (validateBody(req.body).error) {
    return res.status(400).json({status: validateBody(req.body).error})
  }
    const { _id } = req.user;
    const { id } = req.params;
    const result = await service.updateContact(id, req.body, _id)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    })
}

const updateStatusContact = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await service.updateStatusContact(id, favorite, _id)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    })
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}