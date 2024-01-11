const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const nodemailer = require("nodemailer");

// settings for upload
const storeImage = path.join(process.cwd(), "/public/avatars");

const uploadDir = path.join(process.cwd(), "uploads");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

exports.prepareEnvironment = () => {
  createFolderIfNotExist(uploadDir);
  createFolderIfNotExist(storeImage);
};

exports.proceedFile = async (filePath, originalName, userId) => {
  const fileExtension = originalName.split(".").pop();
  const newPath = path.join(storeImage, userId + "." + fileExtension);
  const img = await Jimp.read(filePath);
  await img
    .resize(256, 256) // resize
    .quality(60) // set JPEG quality
    .writeAsync(newPath); // save
  return newPath;
};

//

const mailConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "i.am.blinova@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(mailConfig);

exports.sendMail = (mailTo, verificationToken) => {
  const emailOptions = {
    from: "irynanodejs@gmail.com",
    to: mailTo,
    subject: "Nodemailer test",
    text: `localhost:3000/api/users/verify/${verificationToken}`,
  };
  return transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

exports.storeImage = storeImage;

exports.uploadDir = uploadDir;
