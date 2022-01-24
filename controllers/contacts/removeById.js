const CreateError = require("http-errors");
const contacts = require("../../models/contacts");

const removeById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await contacts.removeContact(id);
      if (!result) {
        throw new CreateError(404, "Not found");
      }
      res.json({message: "Product deleted", deletedContact: result});
    } catch (error) {
      next(error);
    }
  };

module.exports = removeById;