const contactOperation = require("../../models/contacts");

const add = async (req, res) => {
      const result = await contactOperation.addContact(req.body);
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          result
        }
      })
  }

  module.exports = add;