const { NotFound } = require('http-errors');
// const { contactSchema } = require('../schemas');
const contactsOperation = require('../model');
const { sendSuccessRes } = require('../helpers');

const listContacts = async (req, res) => {
  const result = await contactsOperation.listContacts();
  sendSuccessRes(res, { result });
  // res.json({
  //   status: 'success',
  //   code: 200,
  //   data: {
  //     result: contacts,
  //   },
  // });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.getContactById(contactId);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
    // const error = new Error(`Contact ${contactId} not found`);
    // error.status = 404;
    // throw error;
  }
  sendSuccessRes(res, { result });
  // res.json({
  //   status: 'Success',
  //   code: 200,
  //   data: { result },
  // });
};

const addContact = async (req, res) => {
  // const { error } = contactSchema.validate(req.body);
  // if (error) {
  //   throw new BadRequest(error.message);
  //   // const err = new Error(error.message);
  //   // err.status = 400;
  //   // throw error;
  // }
  const result = await contactsOperation.addContact(req.body);
  sendSuccessRes(res, { result }, 201);
  // res.status(201).json({
  //   status: 'success',
  //   code: 201,
  //   data: {
  //     result,
  //   },
  // });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
    // const error = new Error(`Contact ${contactId} not found`);
    // error.status = 404;
    // throw error;
  }
  sendSuccessRes(res, { message: 'Success delete' });
  // res.json({
  //   status: 'Success',
  //   code: 200,
  //   message: 'Success delete',
  // });
};

const updateById = async (req, res) => {
  // const { error } = contactSchema.validate(req.body);
  // if (error) {
  //   throw new BadRequest(error.message);
  //   // const err = new Error(error.message);
  //   // err.status = 400;
  //   // throw error;
  // }
  const { contactId } = req.params;
  const result = await contactsOperation.updateById(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
    // const error = new Error(`Contact ${contactId} not found`);
    // error.status = 404;
    // throw error;
  }
  sendSuccessRes(res, result);
  // res.json({
  //   status: 'Success',
  //   code: 200,
  //   data: {
  //     result,
  //   },
  // });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
};
