const { serviceAuth } = require("../../service");
const { User } = require("../../service/schemasAuth");

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // console.log("wafawfawf");
    // throw new Error(res.status(409), "Email in use");
  } else {
    const newUser = User.create(name, email, password);
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  }

  // try {
  //   const newUser = await serviceAuth.addUser(name, email, password);
  //   res.json({
  //     status: "success",
  //     code: 201,
  //     data: {
  //       user: newUser,
  //     },
  //   });
  // } catch (e) {
  //   res.status(409).json({
  //     status: "Conflict",
  //     message: "Email in use",
  //   });
  // }
};
module.exports = registerUser;
