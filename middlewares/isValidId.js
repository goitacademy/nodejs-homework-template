const { isValidObjectId } = require("mongoose");
const service = require("../service");
const isValidId = (req, res, next) => {
  const { id } = req.params;
  service.CheckByError(!isValidObjectId(id), 404, `${id} is not valid id`);
  next();
};
module.exports = isValidId;
