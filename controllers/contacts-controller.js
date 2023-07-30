import  { HttpError }  from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import Contact from "../models/contact.js";


const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20, ...query} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner, ...query}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
}

const add = async (req, res, next) => {
    const {_id:owner} = req.user;
    const result = await Contact.create({...req.body,owner});
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body,{new:true});
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
}

const updateFavorite = async(req,res) =>{
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id,req.body,{new:true});
    if(Object.keys(req.body).length === 0 ){
        throw HttpError(400, "missing field favorite");
    }
    if(!result){
        throw HttpError(404,"Not found");
    }
    res.json(result);
}

const deleteById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
      res.json({
        message: "Deleted"
    })
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateFavorite:ctrlWrapper(updateFavorite),
    deleteById: ctrlWrapper(deleteById),
}