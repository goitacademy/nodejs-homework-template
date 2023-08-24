const{ HttpError, ctrlWrapper} = require('../helpers');
const {Book, JoiSchema} = require('../models/contacts');




const getContacts = async (_, res) => {
    
    res.json(await Book.find())
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await (Book.findById(contactId));
    
    if (!contact) {
        throw HttpError(404, 'Not found');
    }
    res.json(contact)
};

const postContact = async (req, res, next) => {

        const { error } = JoiSchema.validate(req.body);
        if (error) {
            throw HttpError(400,error.message)
        };

        const result = await Book.create(req.body);
        res.status(201).json(result) 
};

const deleteContact = async (req, res, next) => {
  
        const { contactId } = req.params; 
        const result = await Book.findByIdAndRemove(contactId);
        if (!result) {
            throw HttpError(404, 'Not Found')
        }
        res.status(200).json({ message: 'The contact was deleted succesfully' })

};

const putContact = async (req, res) => {
    const { error } = JoiSchema.validate(req.body);
        if (error) {
            throw HttpError(400,error.message)
    };
    
    const { contactId } = req.params;
    
    if (!req.body) {
        res.status(400).json({ "message": "missing fields" });
    }
    const result = await Book.findByIdAndUpdate(contactId, req.body);
    if (!result) {
        res.status(404).json({"message": "Not found"})
    }
   
    res.status(200).json(result);
}

module.exports = {
    getContactById: ctrlWrapper(getContactById),
    getContacts: ctrlWrapper(getContacts),
    postContact: ctrlWrapper(postContact),
    deleteContact: ctrlWrapper(deleteContact),
    putContact: ctrlWrapper(putContact)
}