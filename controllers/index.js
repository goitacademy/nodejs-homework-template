const {Contact} = require('../model/contactSchema');
const {HttpError, controllersWrapper} = require('../helpers')

const get = async (req, res) => {
  const result = await Contact.find()
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: `we find ${result.length} contacts`,
    data: result
  });
}

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Not found contact by ${id} id`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: `we find contact with ${id} id`,
    data: result,
  });
}

const create = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const result = await Contact.create({ name, email, phone, favorite });
    if (!result) {
      throw HttpError(404, `Not created`);
  }
  res.status(201).json({
    status: 'success',
    code: 201,
    message: `contact with ${result.name} name is created`,
    data: result
  });
}

const change = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact with id ${id} update success`,
    data: result
  });
}

const favorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({
    status: "seccess",
    code: 200,
    message: `Contact with id ${id} update success`,
    data: result
  });
}

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(202).json({
    staus: "success",
    code: 202,
    message: `Delete success.Contact with id ${id} is removed`,
    data: result
  });
}

module.exports = {
  get: controllersWrapper(get),
  getById: controllersWrapper(getById),
  create: controllersWrapper(create),
  change: controllersWrapper(change),
  favorite: controllersWrapper(favorite),
  remove: controllersWrapper(remove)
}






  

