const { HttpError, ctrlWrapper } = require('../helpers')
const { Contact } = require('../models/contact');
const { ObjectId } = require('mongodb');


const get = async (req, res, next) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  const results = await Contact.find({ owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");
  
  res.json(results)
}

const getById = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, 'Not Found')
  }

  res.json(result)
}

const create = async (req, res) => {
  const data = req.body;
  const owner = req.user._id;
  const result = await Contact.create({...data, owner });

  res.status(201).json(result)
}

const update = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate( id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not Found')
  }
  res.json(result);
}

const updateStatus = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw HttpError(404, 'Not Found')
  }

  res.json(result);
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user._id;
  const result = await Contact.findByIdAndRemove(id, {owner});
  
  if (!result) {
    throw HttpError(404, 'Not Found')
  }

  res.json(result)
}

module.exports = {
  get: ctrlWrapper(get),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  update: ctrlWrapper(update),
  updateStatus: ctrlWrapper(updateStatus),
  remove: ctrlWrapper(remove),
}
