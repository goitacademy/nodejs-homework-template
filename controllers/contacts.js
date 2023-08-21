const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");



const getAll  = async (_, res) => { 
    const result = await contacts.listContacts();
    res.json(result);
};


const getById = async (req, res) => {
    const {id} = req.params;
    const result = await contacts.getById(id);
    
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);

};
  
const add = async (req, res) => {
    console.log('add');
    const result = await contacts.addContact(req.body);
    console.log(result);
    res.status(201).json(result);

};

const updateById = async (req, res) => {
    console.log('updateById');
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
   
};


const deleteById = async (req, res) => {
  
    const {id} = req.params;
    const result = await contacts. removeContact(id);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    
    res.json({
    message: "contact deleted"
    })
    
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}