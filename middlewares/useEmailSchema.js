const { emailSchema } = require("../schemas/contacts");
const { HttpError } = require("../helpers/HttpError");

const useEmailSchema = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);

    if (error) {
      throw new HttpError(400, "missing required field email");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { useEmailSchema };
