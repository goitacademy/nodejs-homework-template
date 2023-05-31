

const Contact = require("../models/contact");

const ctrlWrapper = require("../utils/ctrlWrapper");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const {page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit;
  // const query = { owner };
  
    const contacts = await Contact.find({owner},"-createdAt -updatedAt",{skip,limit}).populate("owner", "email subscription");
    res.status(200).json(contacts);
  
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findOne({ _id: contactId},"-createdAt -updatedAt");
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(contact);

};

const add = async (req, res) => {
  const { _id: owner } = req.user;
    // const { name, email, phone } = req.body;
    const contact = await Contact.create({ ...req.body, owner });
    res.status(201).json(contact);
};

const remove = async (req, res) => {
    const { contactId } = req.params;
    const isContactDeleted = await Contact.findByIdAndUpdate(contactId);
    if (!isContactDeleted) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
    const { contactId } = req.params;
    const result= await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true, });
    if (!result) {
      res.status(400).json({ message: "Not found" });
      return;
    }
    res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result= await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true, });
  if (!result) {
    res.status(404).json({ message: "Not found"});
    return;
  }
  res.status(200).json(result);
};
module.exports = {
  getAll:ctrlWrapper(getAll),
  getById:ctrlWrapper(getById),
  add:ctrlWrapper(add),
  remove:ctrlWrapper(remove),
  update:ctrlWrapper(update),
  updateStatusContact:ctrlWrapper(updateStatusContact),
};