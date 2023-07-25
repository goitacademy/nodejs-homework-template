const { Contact } = require("../../models");
const service = require("../../service");
const updateStatusById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  service.CheckByError(!result, 404);
  res.status(200).json(result);
};
module.exports = service.ctrlWrap(updateStatusById);
