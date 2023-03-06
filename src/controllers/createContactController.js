const service = require("../service/index");
const schema = require("../service/schemas/validation");

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return () => {
      res.status(400).json({
        status: 400,
        message: "missing required name field",
      });
    };
  } else {
    try {
      const value = await schema.validateAsync({ name, email, phone });
      console.log(value);
      const newContact = await service.createCont(value);
      console.log(newContact);
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          newContact,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error.message);
      next(error);
    }
  }
};

module.exports = createContact;
