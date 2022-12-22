const constacts = require("../../models/contacts")

const HttpError  = require("../../helpers");

const updateById = async (req, res, next) => {   
      const { id } = req.params;
    
    const result = await constacts.updateContactId(id, req.body);
    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.json(result);
  
    
}

module.exports = updateById;