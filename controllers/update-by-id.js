const { ContactModel } = require("../models");
const mongoose = require("mongoose");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const idItem = { _id: mongoose.Types.ObjectId(id) };

  await ContactModel.findOneAndUpdate(idItem, {
    name,
    email,
    phone,
  });
  const result = await ContactModel.findOne(idItem);
  res.json(result);
};

module.exports = {
  updateById,
};
