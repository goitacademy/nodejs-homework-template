const Contact = require('../models/contact')
const { HttpError,ctrlWrapper } = require('../helpers')



 const listContacts = async (req, res) => {
   const allContacts = await Contact.find();
   res.json(allContacts)
}

const getContactById = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, 'Not found')
    }
    res.json(result); 
  

}
const addContact = async (req, res) => {
  
     
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact)
  
}

const removeContact = async (req, res) => {

  const { contactId } = req.params;
  
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })

}



const updateContact = async (req, res) => {

  const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
     if (!updateContact) {
      throw HttpError(404, 'Not found');
    }
  res.json(updateContact)

}

const updateFavorite = async (req, res) => {

  const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
     if (!updateContact) {
      throw HttpError(404, 'Not found');
    }
  res.json(updateContact)

}

module.exports = {
    listContacts:ctrlWrapper(listContacts),
    getContactById:ctrlWrapper(getContactById),
    addContact:ctrlWrapper(addContact),
    removeContact:ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
    
}