const constacts = require("../../models/contacts")

const HttpError  = require("../../helpers");

const { addSchema } = require("../../schemas/contacts");

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
      
      const { id } = req.params;
    
    const result = await constacts.updateContactId(id, req.body);
    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.json(result);
  }
  catch (error) {
    next(error);
  }
    
}

module.exports = updateById;