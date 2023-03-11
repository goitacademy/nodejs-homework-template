const { checkUserDB, addNewUser } = require("../../services");

const { userValidator } = require("../../middleware");
const { RequestError } = require("../../helpers");

const registerController = async (req, res) => {
  const { error } = userValidator.validate(req.body);
  const { email, password } = req.body;

  const userExist = await checkUserDB(email);

  if (error) {
    throw RequestError(400, error.details[0].message);
  }

  if (userExist) {
    throw RequestError(409, "Emale in use");
  }
  const register = await addNewUser({ email, password });

  return res.status(201).json({
    user: {
      email: register.email,
      subscription: "starter",
    },
  });
};

module.exports = registerController;
