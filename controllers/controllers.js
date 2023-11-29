const {HttpError}= require('../helpers/HttpError');
const { Contact } = require('../models/Contact');


const getAll = async (req, res) => {
  const{_id: owner} = req.user;
  const {page=1, limit=5, favorite}=req.query;
  const skip=(page-1)*limit;
  const filter = {owner};
  if (favorite !== undefined){
    filter.favorite = favorite;
  }
  const result = await Contact.find(filter, {skip, limit }).populate("owner", "email subscription");
  res.json({result});
};

const getById = async (req, res) => {
  const { id } = req.params;
  const{_id: owner} = req.user;
  const contact = await Contact.findOne({_id: id, owner});

  if (!contact) {
    throw new HttpError(404, `Contact with id=${id} not found`);
}
res.json({contact});
};

const add = async (req, res) => {
  const{_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});

  res.status(201).json({result});
}



const deleteById = async (req, res) => {
  const { id } = req.params;
  const{_id: owner} = req.user;
  const contact = await Contact.findByIdAndDelete({_id: id, owner});

  if (!contact) {
    throw new HttpError(404, `Contact with id=${id} not found`);
}
res.json({contact});
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const{_id: owner} = req.user;
  const { name, email, phone} = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    {_id: id, owner},
    { name, email, phone},
    { new: true }
  );
  if (!updatedContact) {
    return next(HttpError(404, `Contact with id=${id} not found`));
}
res.json({updatedContact});
};


const updateStatusContact =  async (req, res, next) => {
  const { id } = req.params;
  const{_id: owner} = req.user;
  const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate({_id: id, owner}, { favorite },
      { new: true }
    );
  
    if (!updatedContact) {
      return next(HttpError(404, `Contact with id=${id} not found`));
    }
  
    res.json({updatedContact});
  };

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact
};