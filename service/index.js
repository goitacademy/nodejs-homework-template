const Cont = require("../models/contactModel");
console.log(Cont);

const getAllcontacts = async () => {
  const contacts = await Cont.find();
  console.log(contacts);
  return contacts;
};

const getContById = async (id) => {
  // console.log(id);
  const contact = await Cont.findById(id);
  return contact;
};

const createCont = async ({ name, email, phone }) => {
  const contact = await Cont.create({ name, email, phone });
  return contact;
};

const updateCont = async (id, { name, email, phone }) => {
  const contact = await Cont.findByIdAndUpdate(id, { name, email, phone });
  return contact;
};

const removeCont = async (id) => {
  return await Cont.findOneAndRemove({ _id: id });
};

const updateContStatus = async (contactId, { favorite }) => {
  const contact = await Cont.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  return contact;
};

module.exports = {
  getAllcontacts,
  getContById,
  createCont,
  updateCont,
  removeCont,
  updateContStatus,
};
