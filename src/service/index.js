const Cont = require("./schemas/cont");

const getAllcontacts = async () => {
  return Cont.find();
};

const getContById = (id) => {
  return Cont.findOne({ _id: id });
};

const createCont = ({ name, email, phone }) => {
  return Cont.create({ name, email, phone });
};

const updateCont = (id, fields) => {
  return Cont.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeCont = (id) => {
  return Cont.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllcontacts,
  getContById,
  createCont,
  updateCont,
  removeCont,
};
