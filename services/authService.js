// const { User } = require("../db/UserModel");
// const { NotAuthorizedError } = require("../helpers/errors");
// const {bcryptjs}= require("bcryptjs")

const registration = async (body) => {
  //   const { email, password } = body;
  //   const user = new User({ email, password });
  //   await user.save();
};

const login = async (id) => {
  //   const contact = await Contact.findById(id);
  //   if (contact === null) {
  //     throw new WrongParametersError(`Contact with id:${id} not found`);
  //     // return res.status(404).json({ message: "Not found" });
  //   }
  //   return contact;
};

module.exports = {
  registration,
  login,
};
