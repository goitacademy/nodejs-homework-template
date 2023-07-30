import Contact from '../models/contact.js';
import httpError from "../helpers/httpError.js";
import  ctrlWrapper  from '../decorators/cntrWrapper.js';

const getAll = async (req, res) => {
      const result = await Contact.find({}, '-createAt -updateAt');
      res.json({ result });
};

const getById = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findById(id);
      if (!result) {
         throw httpError(404, `Contact with id=${id} not found`);
      }
      res.json(result);
};

const add = async (req, res) => {
      const result = await Contact.create(req.body);
      res.status(201).json(result);
};

const updateById = async (req, res) => {
   const { id } = req.params;   
   const result = await Contact.findByIdAndUpdate(id, { ...req.body, id }, {new: true});
      if (!result) {
         throw httpError(404, `Contact with id=${id} not found`);
      }
   res.json(result);
};

const updateFavorite = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, { ...req.body, id }, {new: true});
      if (!result) {
         throw httpError(404, `Contact with id=${id} not found`);
      }
   res.json(result);
};

const deleteById = async (req, res) => {
   const { id } = req.params;
   console.log(req.params);
      console.log(id);

      const result = await Contact.findByIdAndRemove(id);
      if (!result) {
         throw httpError(404, `Contact with id=${id} not found`);
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