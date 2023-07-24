const {addSchema} = require("../schemas");
const {updateFavoriteSchema} = require("../schemas");
const {HttpError} = require("../helpers");
const Contact = require("../models/contact");



const getAll = async (req, res, next) => {
    try {
      const {_id: owner} = req.user;
      const {page = 1, limit = 10} = req.query;
      const skip = (page - 1) * limit;
      const result = await Contact.find({owner}, "-v", {skip, limit}).populate("owner");
      res.json(result)
    }
    catch(error) {
      next(error);
    } 
}

const getById = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await Contact.findById(id);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result)
    }
    catch(error) {
      next(error);
    }
}

const add = async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body);
      
      if(error) {
        throw HttpError(400, "missing required name field");
      }

      const {_id: owner} = req.user;
      const result = await Contact.create({...req.body, owner});
      res.status(201).json(result)
    }
    catch(error) {
      next(error);
    }
}

const updateById = async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body);
      if(error) {
          throw HttpError(400, "missing fields");
      }
      const {id} = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result)
    }
    catch(error) {
      next(error);
    }
}

const deleteById = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await Contact.findByIdAndRemove(id);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json({ message: 'contact deleted'})
    }
    catch(error) {
      next(error)
    }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const {error} = updateFavoriteSchema.validate(req.body);
    if(error) {
        throw HttpError(400, "missing fields");
    }
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
      throw HttpError(400, "missing field favorite");
    }
    res.json(result)
  }
  catch(error) {
    next(error);
  }
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
    updateStatusContact,
}