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
  return Cont.findOneAndRemove({ _id: id });
};

const updateContStatus = (id, favorite) => {
  return Cont.findByIdAndUpdate({ _id: id }, { favorite }, { new: true });
};

module.exports = {
  getAllcontacts,
  getContById,
  createCont,
  updateCont,
  removeCont,
  updateContStatus,
};
