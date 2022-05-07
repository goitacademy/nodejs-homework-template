const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const result = await Contact.findByIdAndUpdate(id, { body }, { new: true });
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
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
