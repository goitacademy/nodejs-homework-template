const service = require('../service')
const chalk = require('chalk');
const { status } = require('../status');

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts()
    res.json({
      status: 'success',
      code: status.OK,
      data: {
        contacts: results,
      },
    }) 
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await service.getContactById(id)
    if (result) {
      res.json({
        status: 'success',
        code: status.OK,
        data: { contact: result },
      })
    } else {
      res.status(status.NOT_FOUND).json({
        status: 'error',
        code: status.NOT_FOUND,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(chalk.red(e))
    next(e)
  }
}

const create = async (req, res, next) => {
  const { name, email, phone, favorite = false } = req.body
  const isExistBody = Object.keys(req.body).length;
   if (!isExistBody) { 
      res.status(status.BAD_REQUEST).json({ "message": "missing fields !" });
      return;
    }
  try {
    const result = await service.createContact({ name, email, phone, favorite })
    res.status(status.CREATED).json({
      status: 'success',
      code: status.CREATED,
      data: { contact: result },
    })
  } catch (e) {
    console.error(chalk.red(e))
    next(e)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, email, phone } = req.body
  const isExistBody = Object.keys(req.body).length;
   if (!isExistBody) { 
      res.status(status.BAD_REQUEST).json({ "message": "missing fields !" });
      return;
    }
  try {
    const result = await service.updateContact(id, { name, email, phone })
    if (result) {
      res.json({
        status: 'success',
        code: status.OK,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const updateStatus = async (req, res, next) => {
  const { id } = req.params
  const { favorite = false } = req.body
  const isExistBody = Object.keys(req.body).length;
  
  if (!isExistBody) { 
    res.status(status.BAD_REQUEST).json({ "message": "missing field favorite" });
    return;
  }
  try {
    const result = await service.updateContact(id, { favorite })
    if (result) {
      res.json({
        status: 'success',
        code: status.OK,
        data: { contact: result },
      })
    } else {
      res.status(status.NOT_FOUND).json({
        status: 'error',
        code: status.NOT_FOUND,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(chalk.red(e))
    next(e)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await service.removeContact(id)
    if (result) {
      res.json({
        status: 'success',
        code: status.OK,
        data: { contact: result },
      })
    } else {
      res.status(status.NOT_FOUND).json({
        status: 'error',
        code: status.NOT_FOUND,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(chalk.red(e))
    next(e)
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
}
