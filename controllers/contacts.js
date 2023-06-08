const contacts = require('../models/contacts')

const getAll = async (req, res, next)=>{
    try{
        const result = await contacts.getContacts();
        res.json(result);
      }
      catch(error){
        next(error)
      }
}

const getById = async (req, res, next) => {
    try{
      const {contactId} = req.params;
      const result = await contacts.getContactById(contactId);
      if(!result){
        return res.status(404).json({ message: "Not found" });
      }
      res.json(result);
    }
    catch(error) {
      next(error)
    }
  }

  const add = async (req, res, next) => {
    try{
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
    }
    catch(error){
      next(error);
    }
  }

  const deleteRecord = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.removeContact(contactId);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      res.json({ message: "contact deleted" });
    } catch (error) {}
  };

  const update = async (req, res) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      res.json(result);
    } catch (error) {}
  };

module.exports = {
    getAll,
    getById,
    add,
    deleteRecord,
    update,
}