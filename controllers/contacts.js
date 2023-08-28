const{ HttpError, ctrlWrapper} = require('../helpers');
const {Contact, JoiSchema, favoriteSchema} = require('../models/contacts');


const getContacts = async (_, res) => {

    const result = await Contact.find({});
   
    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await (Contact.findById(contactId));
    
    if (!contact) {
        throw HttpError(404, 'Not found');
    }
    res.json(contact)
};

const postContact = async (req, res) => {

        const { error } = JoiSchema.validate(req.body);
        if (error) {
            throw HttpError(400,error.message)
        };

        const result = await Contact.create(req.body);
        res.status(201).json(result) 
};

const deleteContact = async (req, res, next) => {
  
        const { contactId } = req.params; 
        const result = await Contact.findByIdAndRemove(contactId);
        if (!result) {
            throw HttpError(404, 'Not Found')
        }
        res.status(200).json({ message: 'The contact was deleted succesfully' })

};

const putContact = async (req, res) => {
    const { error } = JoiSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message)
    };
    
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
    if (!result) {
        res.status(404).json({ "message": "Not found" })
    }
   
    res.status(200).json(result);
};

const patchContact = async (req, res) => {
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    };

    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    
    if (!result) {
        res.status(404).json({ "message": "Not found" })
    };

    res.status(200).json(result);
}

module.exports = {
    getContactById: ctrlWrapper(getContactById),
    getContacts: ctrlWrapper(getContacts),
    postContact: ctrlWrapper(postContact),
    deleteContact: ctrlWrapper(deleteContact),
    putContact: ctrlWrapper(putContact),
    patchContact:ctrlWrapper(patchContact)
}