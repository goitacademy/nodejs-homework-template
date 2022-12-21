const { Contact } = require("../../models");
const createError = require("http-errors");

const updateById = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: _id },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw createError(404, `Product with id ${id} not found`);
  }
  
  res.status(200).json({
    status: "succes",
    code: 200,
    result,
  });
};

module.exports = updateById;
