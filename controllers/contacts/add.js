const { Contact } = require("../../models/contact");
const ObjectId = require("mongodb").ObjectId;

const add = async (req, res) => {
  const { _id } = ObjectId(req.user);
  const contactAdd = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contactAdd,
    },
  });

  // try {
  //   const { error } = joiSchema.validate(req.body);
  //   if (error) {
  //     error.status = 400;
  //     res.json({ message: "missing required name field" });
  //     throw error;
  //   }
  //   const { _id } = req.user;
  //   const contactAdd = await Contact.create({ ...req.body, owner: _id });

  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //       result: contactAdd,
  //     },
  //   });
  // } catch (error) {
  //   next(error);
  // }
};
module.exports = add;
