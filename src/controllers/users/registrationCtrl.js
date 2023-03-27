const {
  findUserInDb,
  addNewUser,
  sendEmail,
  createEmail,
} = require("../../services");
const { userValidation } = require("../../middlewares");
const { v4: uuidv4 } = require("uuid");

const registrationCtrl = async (req, res) => {
  const { error } = userValidation.validate(req.body);
  const { email } = req.body;
  const userIsAlreadyInDb = await findUserInDb(email);
  const verificationToken = uuidv4();

  const mail = createEmail(email, verificationToken);

  if (userIsAlreadyInDb) {
    return res.status(409).json({ message: "Email in use" });
  }

  await addNewUser({ ...req.body, verificationToken: verificationToken });

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  await sendEmail(mail);

  return res.status(201).json({
    user: {
      email: email,
      subscription: "starter",
    },
  });
};

module.exports = registrationCtrl;
