const {HttpError}= require('../helpers/HttpError');
const { Contact } = require('../models/Contact');


const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new HttpError(404, `Contact with id=${id} not found`);
}
res.json(contact);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
}



const deleteById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id);

  if (!contact) {
    throw new HttpError(404, `Contact with id=${id} not found`);
}
res.json(contact);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone} = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone},
    { new: true }
  );
  if (!updatedContact) {
    throw new HttpError(404, `Contact with id=${id} not found`);
}
res.json(updatedContact);
};


const updateStatusContact =  async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(id, { favorite },
      { new: true }
    );
  
    if (!updatedContact) {
      throw new HttpError(404, `Contact with id=${id} not found`);
    }
  
    return updatedContact;
  };

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact
};