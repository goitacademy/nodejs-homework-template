// const Joi = require('joi')
const service = require('../service/service')

const listContacts = async (req, res, next) => {
 
    try {
      const results = await service.getAlltasks();
      res.json({
        status: 'success',
        code: 200,
        data: {
          tasks: results,
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  };


const getContactById=async (req, res, next) => {
    const { contactId } = req.params;
   
    try {
      
      const result = await service.getTaskById(contactId);
      console.log( req.params)
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { task: result },
        });
      } else {

        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${contactId}}`,
          data: 'Not Found',
        });
      }
    } catch (e) {
     
      console.error(e);
      next(e);
    }
  };
const addContact=async (req, res, next) => {
    const{ name, email, phone } = req.params.body;
    try {
      const result = await service.createTask(name, email, phone );
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { task: result },
        });
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${name }`,
          data: 'Not Found',
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }}
   
const removeContact=async (req, res, next) => {
    const { contactId } = req.params;
    try {
      const result = await service.removeTask(contactId);
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { task: result },
        });
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${contactId}`,
          data: 'Not Found',
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }}
const updateContact=async (req, res, next) => {
    const { contactId } = req.params;
    const  body  =req.body
    try {
      const result = await service.updateTask(contactId, body);
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { task: result },
        });
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${contactId}`,
          data: 'Not Found',
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }}

const updateStatusContact=async (req, res, next) => {
    const { contactId } = req.params;
    try {
      const result = await service.updateStatus(contactId);
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { task: result },
        });
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${contactId}`,
          data: 'Not Found',
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }}

    module.exports = { 
         listContacts,
        getContactById,
        removeContact,
        addContact,
        updateContact,
        updateStatusContact,
    }