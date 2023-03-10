const service = require("../../service/index");
const schema = require("../../service/schemas/validation");

const updateCont = async (req, res, next) => {
  const contactId = req.params.id;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return () => {
      res.status(400).json({
        status: 400,
        message: "missing required name field",
      });
    };
  } else if (contactId) {
    try {
      const value = await schema.validateAsync({ name, email, phone });
      console.log(" value", value);
      const updatedContact = await service.updateCont(contactId, value);
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          updatedContact,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error.message);
      next(error);
    }
  } else {
    return () => {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found `,
      });
    };
  }
};

module.exports = updateCont;
