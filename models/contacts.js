const Joi = require('joi');
const service = require('../service');

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

const listContacts = async (req, res, next) => {
  try {
    const results = await service.getAllContacts()
    res.json({
      status: 'success',
      code: 200,
      data: results,
    }) 
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await service.getContactById(id);
    res.json({
      status: 'success',
      code: 200,
      data: results,
    }) 
  } catch (e) {
    console.error(e)
    next(e)
  } 
}

const addContact = async (req, res, next) => {
  if (validateBody(req.body).error) {
    return res.status(400).json({status: validateBody(req.body).error})
  }
  try {
    const result = await service.createContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await service.removeContact(id);
    res.json({
      status: 'success',
      code: 200,
      data: results,
    }) 
  } catch (e) {
    console.error(e)
    next(e)
  } 
}

const updateContact = async (req, res, next) => {
  if (validateBody(req.body).error) {
    return res.status(400).json({status: validateBody(req.body).error})
  }
  try {
    const { id } = req.params;
    const result = await service.updateContact(id, req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await service.updateStatusContact(id, favorite)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}