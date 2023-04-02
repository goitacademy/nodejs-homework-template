
const Contact = require("../models/contact");

const HttpError = require('../helpers/HttpError');

const ctrlWrapper = require('../helpers/ctrlWrapper');



const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};
    

const getById = async (req, res) => {
    
        const { id } = req.params;
        const result = await Contact.findById(id);
        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.json(result);
    
    };

const add = async (req, res) => {
  
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  
    
};

// const removeContact = async (req, res) => {
  
//         const { id } = req.params;
//         const result = await contacts.removeContact(id);
//         if (!result) {
//             throw HttpError(404, `Not found`);
//         }

//         res.json({
//             message: "contact deleted",
//         });
    
//     };

// const updateContact = async (req, res) => {
    
//         const { id } = req.params;
//         const result = await contacts.updateContact(id, req.body);
//         if (!result) {
//             throw HttpError(400, `Not found`);
//         }
//         res.json(result);
      
// };

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    // removeContact: ctrlWrapper(removeContact),
    // updateContact: ctrlWrapper(updateContact),


}