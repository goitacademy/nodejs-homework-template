// const contacts = require("../models/contacts");
const {Contact} = require("../models/contact")

const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
      // const result = await Contact.find({}, "name");
      const result = await Contact.find();
      // console.log(result);
      res.json(result);
  }
  

const getById = async (req, res) => {
     const {contactId} = req.params;
    //  const result = await Contact.findOne({_id: contactId})
    const result = await Contact.findById(contactId)

     if (!result) {   
     throw HttpError(404,"Not found");
     }
     res.json(result)
   }

const add = async (req, res) => {
          const result = await Contact.create(req.body); 
          res.status(201).json(result)
  }

const updateById = async (req, res) => {
          const {contactId} = req.params;
          const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true})
          if (!result) {   
            throw HttpError(404, "Not found");
            }
            res.json(result) 
  }

  const updateStatusContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true})
    if (!result) {   
      throw HttpError(404, "Not found");
      }
      res.json(result) 
}

const deleteById = async (req, res) => {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndRemove(contactId)
      console.log(result)
      if (!result) {   
        throw HttpError(404, "Not found");
        }
        res.json({message:"Delete success"}) 
    }

   module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteById: ctrlWrapper(deleteById),
   }
