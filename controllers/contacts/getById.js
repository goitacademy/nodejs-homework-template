const { Contact } = require("../../models/contacts");
const { NotFound} = require("http-errors");


const getById = async (req, res, next) => {
    try {

      const { contactId } = req.params;

      const contact = await Contact.findById(contactId);

      if (!contact) {
        throw new NotFound("Oops, file not found");

       
      }

      res.json({
        status: "success",
        code: 200,
        data: {
          result: contact,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  module.exports = getById