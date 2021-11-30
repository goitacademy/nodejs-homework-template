const { NotFound } = require("http-errors");

const { Contact } = require("../../model");

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    throw createError(400, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateStatus;
