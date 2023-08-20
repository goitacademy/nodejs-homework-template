const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const isEmpty = require('lodash.isempty');

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
    const result = await contacts.add(req.body);
    res.status(201).json(result);
    

};

const updateById = async (req, res) => {
    console.log(isEmpty(req.body));
    if(isEmpty(req.body)){
        throw HttpError(400, 'missing fields');

    }
    
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