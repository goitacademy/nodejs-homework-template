/** @format */

const {Contact} = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};



module.exports = add;
