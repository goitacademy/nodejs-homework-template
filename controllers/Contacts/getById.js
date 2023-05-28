const { HttpError } = require("../../Helpers");
const { cntModel } = require("../../models/contacts");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await cntModel.findById(id);
  if (!contact) {
    throw HttpError(404, `Movie with ${id} not found`);
  }
  res.json({
    status: 200,
    data: {
      contact,
    },
  });
};

module.exports = {
  getContactById,
};
