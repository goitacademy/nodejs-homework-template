const { User } = require("../models/user");
const { sendMail } = require("../helpers/helpers");
const { BadRequest } = require("http-errors");

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

   user.contacts.push({ _id: contactId });
  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
    fields: { contacts: 1 },
  });
  return res.status(201).json({
    data: {
      contacts: updatedUser.contacts,
    },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;

  const userWithContacts = await User.findById(user._id).populate("contacts", {
    name: 1,
    email: 1,
    phone: 1,
    _id: 1,
  });
  return res.status(200).json({
    data: {
      contacts: userWithContacts.contacts,
    },
  });
}

async function me(req, res, next) {
  const { user } = req;
  const { email, _id: id } = user;

  return res.status(200).json({
    data: {
      user: {
        email,
        id,
      },
    },
  });
}
async function verifyEmail(req, res, next) {
  const { token } = req.params;
  const user = await User.findOne({
    verifyToken: token,
  });

  if (!user) {
    throw BadRequest("Verify token is not valid!");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verifyToken: null,
  });

  return res.json({
    message: "Success",
  });
}

async function resendVerify(req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({email});

  if (!user) {
    throw BadRequest("missing required field email");
  }
  if(user.verify){
    throw BadRequest("Verification has already been passed");
  }
  await sendMail({
    to: email,
    subject: "please confirm your email",
    html: `<a href="localhost:3001/api/users/verify/${user.verifyToken}">confirm your email</a>`,
  });


  return res.json({
    message: "Success",
  });
}

module.exports = {
  createContact,
  getContacts,
  me,
  verifyEmail,
  resendVerify
};