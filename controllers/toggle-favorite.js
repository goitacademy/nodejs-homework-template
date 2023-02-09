const { ContactModel } = require("../models");
const mongoose = require("mongoose");
const { createHttpException } = require("../helpers");

const toggleFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (!favorite && favorite !== false) {
    throw createHttpException(404, "Missing field favorite");
  }
  const idItem = { _id: mongoose.Types.ObjectId(id) };

  await ContactModel.findOneAndUpdate(idItem, { favorite });
  const result = await ContactModel.findOne(idItem);
  res.json(result);
};

module.exports = {
  toggleFavorite,
};
