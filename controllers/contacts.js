

const contacts = require('../models/contacts')

const { HttpError, ctrlWrapper } = require("../helpers");
// const { get } = require("../routes/api/contacts");




const getAll = async (req, res, next) => {

        const result = await contacts.listContacts();
        res.json(result)

};


const getById = async (req, res, next) => {
    
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
        throw HttpError(404, "Not found");
        // const error = new Error("Not found");
        // error.status = 404;
        // throw error;
        // return res.status(404).json({
        //   message: "Not found"
        // })
    };

    res.json(result)

};

const add = async (req, res, next) => { 
      
        const result = await contacts.addContact(req.body);
        res.status(201).json(result)
};

const deleteById = async (req, res, next) => {
        const { id } = req.params;
        const result = await contacts.removeContact(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json({
            message: "Delete success"
        })
  
};

const updateById = async (req, res, next) => {

    
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
      
    }
    res.json(result);
 
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
}