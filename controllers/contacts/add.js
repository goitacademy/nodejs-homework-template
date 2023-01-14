const { Contact } = require("../../models/contact");

const add = async (req, res, next) => {
  try {
    console.log("req.body:", req.body);
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
