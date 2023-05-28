const { cntModel } = require("../../models/contacts");
const { HttpError } = require("../../Helpers");

const setFaforited = async (req, res, next) => {
  const { id } = req.params;

  const setFaforited = await cntModel.findByIdAndUpdate(id, req.body);
  if (!setFaforited) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    status: 200,
    data: {
      setFaforited,
    },
  });
};

module.exports = setFaforited;
