const { ContactModel } = require("../../db/contacts.model");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find({owner:req.userId});
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const contact = await ContactModel.findOne({_id:id,owner:req.userId});
    res.json(contact);
  } catch (error) {
    
    res.status(404).json({ message: "Not found" });
  }
};
const addContact = async (req, res, next) => {
  try {
    const newContact = await ContactModel.create({...req.body,owner:req.userId });
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "missing required name field" });
  }
};
const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    await ContactModel.findOneAndRemove({_id:id,owner:req.userId});
    res.json({ message: "contact deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
};
const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const isFieldExist = Object.keys(req.body).length;
    if (!isFieldExist) {
      return res.status(400).json({ message: "missing fields" });
    } else {
      const upDateContact = await ContactModel.findOneAndUpdate({_id:id, owner:req.userId}, req.body, {
        new: true,
      });
      res.json(upDateContact);
    }
  } catch (error) {
    // throw new Error()
    res.status(404).json({ message: "Not found" });
    console.log(error.message);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    if (!req.body.favorite)
      return res.status(400).json({ message: "missing field favorite" });
    else {
      const upDateContact = await ContactModel.findOneAndUpdate({_id:id, owner:req.userId}, req.body, {
        new: true,
      });
      res.json(upDateContact);
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
