const fs = require('fs/promises');
const path = require('path');

const Contact = require('../models/contact');
const contactsDir = path.resolve("public", "avatars");

const getAll = async (req, res, next)=>{

    try{
      const {_id: owner} = req.user;
        const result = await Contact.find({owner});
        res.json(result);
      }
      catch(error){
        next(error)
      }
}

const getById = async (req, res, next) => {
    try{
      const {id} = req.params;
      // const result = await Contact.findById(contactId);
      const result = await Contact.findOne({_id: id});
      if(!result){
        return res.status(404).json({ message: "Not found" });
      }
      res.json(result);
   
    }
    catch(error) {
      return res.status(404).json({ message: "Invalid Id" });
    }
  }

  const add = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { path: oldPath, filename} = req.file;
    const newPath = path.join(contactsDir, filename);
   await fs.rename(oldPath, newPath);
   const avatarURL = path.join("avatars", filename)
    const result = await Contact.create({...req.body, avatarURL, owner});
    res.status(201).json(result);

    // try{
    //   const {_id: owner} = req.user;
    //   const result = await Contact.create({...req.body, owner});
    // res.status(201).json(result);
    // }
    // catch(error){
    //   next(error);
    // }
  }

  const deleteRecord = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      if(!result){
        return res.status(404).json({ message: "Not found" });
      }
      res.json({ message: "contact deleted" });
    } catch (error) {
      return res.status(404).json({ message: "Invalid Id" });
    }
  };

  const update = async (req, res) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if(!result){
        return res.status(404).json({ message: "Not found" });
      }
      res.json(result);
    } catch (error) {
      return res.status(404).json({ message: "Invalid Id" });
    }
  };

  const updateFavorite = async(req, res, next) =>{
    try {
      const { contactId } = req.params;
      // console.log(contactId)
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if(!result){
        return res.status(400).json({ message: "Missing field favorite" });
      }
      res.json(result);
    } catch (error) {
      return res.status(404).json({ message: "Not found Id" });
    }
  }

module.exports = {
    getAll,
    getById,
    add,
    deleteRecord,
    update,
    updateFavorite,
}