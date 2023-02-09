const { ContactModel } = require("../models");
const mongoose = require("mongoose");

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const idItem = { _id: mongoose.Types.ObjectId(id) };

  await ContactModel.findOneAndRemove(idItem);
  res.status(204).send();
};

module.exports = {
  deleteById,
};
