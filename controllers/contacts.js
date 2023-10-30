// const fs = require('fs/promises')
const service = require('../services/contacts');

const listContacts = async (_, res, __) => {
  //res.json({ message: 'template message 1' });
  //console.log(req.query);
  const result = await service.listAllContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res, __) => {
  //res.json({ message: 'template message 2' });
  const id = req.params.id;
  const result = await service.getContactById(id);

  res.status(200).json(result);
};

const addContact = async (req, res, __) => {
  //res.json({ message: 'Contact was created successfully' });
  try {
    const { success, result, message } = service.createUser(req.body);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(201).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const updateContact = async (_, res, __) => {
  //res.json({ message: 'Contact was update successfully' });
  try {
    const { id } = req.params;

    const { success, result, message } = await service.updateUser(id, req.body);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const removeContact = async (_, res, __) => {
  //res.json({ message: 'Contact was deleted successfully.' });
  try {
    const { id } = req.params;

    const { success, result, message } = await service.deleteUser(id);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
