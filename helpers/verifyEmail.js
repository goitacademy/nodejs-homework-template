import { sendEmail } from "../helpers/index.js";
import fs from "fs";
import path from "path";

const { HOST } = process.env;
const source = fs.readFileSync(
  path.join("emailMessage", "./index.html"),
  "utf8"
);

const verifyEmailUser = async (email, verificationToken) => {
  const replacedTemplate = source.replace(
    /{{url}}/g,
    `${HOST}/api/users/verify/${verificationToken}`
  );
  const verifyEmail = {
    to: email,
    subject: "Confirmation of register on the contact site❤️",
    html: replacedTemplate,
  };

  await sendEmail(verifyEmail);
};

export default verifyEmailUser;
