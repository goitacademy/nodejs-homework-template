
const Contact = require('../models/contact');

const {HttpError,  controllerWrapper} = require('../helpers');


// Отримати всі контакти
const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// Отримати контакт за id
const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({ _id: id });
  const result = await Contact.findById(id);
  console.log(result);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

// Додати контакт
const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// Оновити контакт за id
const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

// Оновити favorite
const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

// Видалити контакт за id
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }  
  res.json({
    message: 'Delete success',
    result,
  });  
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  updateById: controllerWrapper(updateById),
  updateFavorite: controllerWrapper(updateFavorite),
  deleteById: controllerWrapper(deleteById),
};
