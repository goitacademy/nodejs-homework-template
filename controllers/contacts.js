const {Contact} = require("../models/contact")
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {  
  const {_id: owner} = req.user;  
  const {page = 1, limit = 20} = req.query;   
  const skip = (page-1)*limit;
  const favorite = req.query.favorite
  const filter = {owner};

  if(favorite !== undefined){
    filter.favorite = favorite;
  }

  const result = await Contact.find(filter, "", {skip, limit, filter}).populate("owner", "name email");
  // const result = await Contact.find(filter, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");  
  res.json(result);
};

const getContactById = async (req, res) => {
  const contactId = req.params.id;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {  
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  deleteContactById: ctrlWrapper(deleteContactById),
};
