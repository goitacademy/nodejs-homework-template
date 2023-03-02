const { Contact } = require("../../models/contacts");
const { requestError } = require("../../helpers/requestError");

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (!req.body.favorite) return next(requestError(400, "Missing field favorite"));
    
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  
    if (!result) return next(requestError(404, "Not found"));
    
    res.json({
      status: "success",
      code: 200,
      data: { data: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
