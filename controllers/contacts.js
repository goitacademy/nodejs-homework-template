

const Contact = require("../models/contact");


const HttpError = require("../helpers/HttpError");
const  ctrlWrapper  = require("../helpers/ctrl.Wrapper");


const getAll =  async (req, res) => {

     const result = await Contact.find();
      res.json(result)
   
}

const getContact =  async (req, res) => {
    
      const {contactId} = req.params;
    
      const result = await Contact.findById(contactId);
     if(!result){
      throw HttpError(404,"Not found")
     }
      res.json(result)
    
}

const addContact =  async (req, res) => {
    
      
   
   
      const result = await Contact.create(req.body)
    
     res.status(201).json(result)
    
}

const deleteContact = async (req, res) => {
   
      const {contactId} = req.params;
      const result = await Contact.findByIdAndDelete(contactId);
      if(!result){
        throw HttpError(404,"Not found")
      }
      res.json({message:"delete succes"})
    
}

const updateContact =async (req, res) => {
     
    
          const { contactId } = req.params;
          const body = req.body
          const result = await Contact.findByIdAndUpdate(contactId, body, {new: true});
          res.json(result)
  
     
}

const updateFavorite = async (req,res) =>{
    const { contactId } = req.params;
    console.log(contactId)
    const body = req.body
    const result = await Contact.findByIdAndUpdate(contactId, body, {new: true});
    res.json(result)

}



module.exports = {
    getAll:ctrlWrapper(getAll),
    getContact:ctrlWrapper(getContact),
    addContact:ctrlWrapper(addContact),
    deleteContact:ctrlWrapper(deleteContact),
    updateContact:ctrlWrapper(updateContact),
    updateFavorite:ctrlWrapper(updateFavorite),
}