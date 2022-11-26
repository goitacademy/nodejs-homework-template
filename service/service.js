const Contact = require('./schemas');

const getAlltasks = async () => {
  return Contact.find();
};

const getTaskById = id => {
  return Contact.findById(id);
};

const createTask = ( { name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateTask = (id, { name, email, phone, favorite }) => {
  return Contact.findByIdAndUpdate({ _id: id },
     {$set:{ name, email, phone, favorite }});
};

const removeTask = id => {
  return Contact.findByIdAndRemove({ _id: id });
};
const updateStatus = id => {}

module.exports = {
  getAlltasks,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
  updateStatus
};