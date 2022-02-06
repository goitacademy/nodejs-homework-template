const CreateError = require("http-errors");
const {Contact} = require("../../models/contact");

const removeById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Contact.findByIdAndDelete(id);
      if (!result) {
        throw new CreateError(404, "Not found");
      }
      res.json({message: "Contact deleted", deletedContact: result});
    } catch (error) {
      next(error);
    }
  };

module.exports = removeById;