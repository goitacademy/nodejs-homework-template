const { ContactModel } = require("../../models/contact.model");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  const result = await ContactModel.findByIdAndUpdate(
    id,
    { name, email, phone, favorite },
    { new: true }
  );

  res.json(result);
};

module.exports = {
  updateById,
};
