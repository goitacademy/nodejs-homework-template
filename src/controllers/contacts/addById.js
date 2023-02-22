const { Contact } = require("../../models/index");

const addById = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const result = await Contact.create({...req.body, owner: _id });
    res.status(200).json({
      status: "created",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addById;
