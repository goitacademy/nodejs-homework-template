const Contact = require("../service/schemas/schemas.js");
const httpError = require("../helpers/httpError");
const Wrapper = require("../helpers/Wrapper");

const listContacts = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id });
  if (!result){
    throw httpError(404, "Not found")
  }
  res.json(result);
};

const addContact = async (req, res) => {
    const { name, phone, email, favorite } = req.body;

    const newContact = new Contact({
      name,
      phone,
      email,
      favorite
    });
console.log(newContact);
    const result = await newContact.save();

    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findOneAndRemove({ _id: id });

    if (!result){
      throw httpError(404, "Contact not found");
    }
    res.status(200).json({ message: "Contact deleted"});
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    await Contact.updateOne({ _id: id }, {$set: {...req.body}});
    const updatedContact = await Contact.findOne({ _id: id });
    if (!updatedContact){
      throw httpError(404, "Not found");
    }
    res.json(updatedContact);
}

const updateFavorite = async(req, res) => {
  const { id } = req.params;
  await Contact.updateOne({ _id: id }, {$set: req.body});
  const updatedContact = await Contact.findOne({ _id: id });
  if (!updatedContact){
    throw httpError(404, "Not found");
  }
  res.json(updatedContact);
}

module.exports = {
  listContacts: Wrapper(listContacts),
  getContactById: Wrapper(getContactById),
  removeContact: Wrapper(removeContact),
  addContact: Wrapper(addContact),
  updateContact: Wrapper(updateContact),
  updateFavorite: Wrapper(updateFavorite)
};
