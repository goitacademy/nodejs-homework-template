
const { Contact } = require('../models/contacts')
const { HttpError, ctrlWrapper } = require('../helpers') 



const getAll = async (req, res) => {
    const data = await Contact.find({}, "-createdAt -updatedAt");
    res.json(data);
  }
  
  const getById = async(req, res) => {
    const {id} = req.params;
    const data = await Contact.findById(id)
    if(!data){
        throw HttpError(404, "Not found");
    }
    res.json(data);
  }

  const add = async(req, res) => {
   const data = await Contact.create(req.body)
   res.status(201).json(data);
  }

  const updateById = async(req,res) => {
    const { id } = req.params;
    const data = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!data){
      throw HttpError(404, "Not found");
  }
    res.json(data);
  }

  const deleteById = async(req,res) => {
    const { id } = req.params;
    const data = await Contact.findByIdAndRemove(id)
    if(!data){
      throw HttpError(404, "Not found");
  }
    res.json({
      message: "Delete success"
    });
  }

  const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const data = await Contact.findByIdAndUpdate(id, req.body, {new: true})
    if (!data) {
      throw HttpError(404, "Not found");
  }
    res.json(data);
  }
  
  


  module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateFavorite: ctrlWrapper(updateFavorite)
  }