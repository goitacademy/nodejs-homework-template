const { Contact } = require("../../models");
const { FindByIdError, ctrlWrap } = require("../../helpers");
const updateStatusById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  FindByIdError(result);
  res.status(200).json(result);
};
module.exports = ctrlWrap(updateStatusById);
