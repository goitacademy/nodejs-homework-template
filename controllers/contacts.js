const { NotFound } = require('http-errors');
// const service = require('../service')
const { Contact } = require('../model/contacts');

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  })
}

const getById = async(req, res, next) => {
  const { contactId } = req.params;
  console.log(typeof (contactId));
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: 'ok',
    code: 200,
    data: { contact }
  })
}

const add = async (req, res, next) => {
  const result = await Contact.create(req.body)
  res.json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not faund`);
  }
  res.json({
    status: 'succes',
    code: 200,
    message: 'contact deleted'
  });
}

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not faund`);
  }
  res.json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
};

// обновление ТОЛЬКО поля любимый контакт
const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not faund`);
  }
  res.json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateStatus
}
