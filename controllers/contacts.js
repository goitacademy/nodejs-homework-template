const Contact = require('../models/contact')
const { HttpError,ctrlWrapper } = require('../helpers')



const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip =(page- 1)*limit
   const allContacts = await Contact.find({owner}, '-createdAt -updatedAt',{skip, limit}).populate("owner", "email");
   res.json(allContacts)
}

const getContactById = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, 'Not found!!!!!!!!')
    }
    res.json(result); 
  

}
const addContact = async (req, res) => {
  
  const { _id: owner } = req.user;
  const newContact = await Contact.create({...req.body,owner});
  res.status(201).json(newContact)
  
}

const removeContact = async (req, res) => {

  const { contactId } = req.params;
  
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404, "Not found!!!!!!");
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

const updateStatusContact = async (req, res) => {

  const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
     if (!updateContact) {
      throw HttpError(400, 'Not missing- field favorite');
    }
  res.json(updateContact)

}

module.exports = {
    listContacts:ctrlWrapper(listContacts),
    getContactById:ctrlWrapper(getContactById),
    addContact:ctrlWrapper(addContact),
    removeContact:ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    
}