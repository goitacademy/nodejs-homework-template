const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  getById: ctrlWrapper(getById),
};
