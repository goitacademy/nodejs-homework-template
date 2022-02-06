const {Contact, schemas} = require("../../models/contact");
const CreateError = require("http-errors");

const updateById = async (req, res, next) => {
    try {
      const { error } = schemas.add.validate(req.body);
      if (error) {
        throw new CreateError(400, {
            message: `Missing required field: ${error.message}`,
          });
      }
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if (!result) {
        throw new CreateError(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

module.exports = updateById;