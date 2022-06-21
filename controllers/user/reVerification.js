import models from "../../models/index.js";
import createError from "http-errors";
import helpers from "../../helpers/index.js";

const { userModel } = models;
const { User } = userModel;
const { NotFound, BadRequest } = createError;
const { sendMail } = helpers;

export const reVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`Email ${email} is wrong or not found`);
  }
  const { verify, verificationToken } = user;
  if (verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    from: "glasgalas@meta.ua",
    subject: "Repeat registration confirmation",
    html: `<p><a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Confirmation</a> email repeat</p>`,
  };

  await sendMail(mail);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};
