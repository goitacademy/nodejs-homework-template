const Contact = require('../models/contact');

const getAll = async (req, res, next)=>{
    try{
        const result = await Contact.find();
        res.json(result);
      }
      catch(error){
        next(error)
      }
}

const getById = async (req, res, next) => {
    try{
      const {contactId} = req.params;
      // const result = await Contact.findById(contactId);
      const result = await Contact.findOne({_id: contactId});
      if(!result){
        return res.status(404).json({ message: "Not found" });
      }
      res.json(result);
    }
    catch(error) {
      next(error)
    }
  }

  const add = async (req, res, next) => {
    try{
      const result = await Contact.create(req.body);
      res.status(201).json(result);
    }
    catch(error){
      next(error);
    }
  }

  const deleteRecord = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      res.json({ message: "contact deleted" });
    } catch (error) {
      return res.status(404).json({ message: "Not found" });
    }
  };

  const update = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

      res.json(result);
    } catch (error) {
      return res.status(404).json({ message: "Not found" });
    }
  };

  const updateFavorite = async(req, res, next) =>{
    try {
      const { contactId } = req.params;
      // console.log(contactId)
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      res.json(result);
    } catch (error) {
      return res.status(404).json({ message: "Not found" });
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