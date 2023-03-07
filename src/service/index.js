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

const updateCont = (id, { name, email, phone }) => {
  return Cont.findByIdAndUpdate(
    { _id: id },
    { name, email, phone }
    // { new: true }
  );
};

const removeCont = (id) => {
  return Cont.findByIdAndRemove({ _id: id });
};

const updateContStatus = (id, status) => {
  return Cont.findByIdAndUpdate({ _id: id }, { status }, { new: true });
};

module.exports = {
  getAllcontacts,
  getContById,
  createCont,
  updateCont,
  removeCont,
  updateContStatus,
};
