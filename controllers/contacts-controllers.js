import Contact from '../models/contact.js';
import HttpError from "../helpers/httpError.js";
import  ctrlWrapper  from '../decorators/cntrWrapper.js';

const getAll = async (req, res) => {
   const { _id: owner } = req.user;
   const { page = 1, limit = 10, favorite } = req.query;
   const skip = (page - 1) * limit;
   const result = await Contact.find(favorite ? { owner, favorite } : {owner}, '-createAt -updateAt', {skip, limit}).populate('owner', 'email subscription');
      res.json({ result });
};

const getById = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findById(id);
      if (!result) {
         throw HttpError(404, `Contact with id=${id} not found`);
      }
      res.json(result);
};

const add = async (req, res) => {
   const { _id: owner } = req.user;
   const result = await Contact.create({ ...req.body, owner });
      res.status(201).json(result);
};

const updateById = async (req, res) => {
   const { id } = req.params;   
   const result = await Contact.findByIdAndUpdate(id, { ...req.body, id }, {new: true});
      if (!result) {
         throw HttpError(404, `Contact with id=${id} not found`);
      }
   res.json(result);
};

const updateFavorite = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, { ...req.body, id }, {new: true});
      if (!result) {
         throw HttpError(404, `Contact with id=${id} not found`);
      }
   res.json(result);
};

const deleteById = async (req, res) => {
   const { id } = req.params;
   console.log(req.params);
      console.log(id);

      const result = await Contact.findByIdAndRemove(id);
      if (!result) {
         throw HttpError(404, `Contact with id=${id} not found`);
      }
      res.json({
         message: "Delete success"
      });
};

export default {
   getAll: ctrlWrapper(getAll),
   getById: ctrlWrapper(getById),
   add: ctrlWrapper(add),
   deleteById: ctrlWrapper(deleteById),
   updateById: ctrlWrapper(updateById),
   updateFavorite: ctrlWrapper(updateFavorite)
};