const {addUser} = require('../../models/users')
const Users = require('../../schemas/users')
const gravatar = require('gravatar')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
console.log(process.env.SENDGRID_API_KEY)

const createUser = async (req, res) => {
    const {email, password } = req.body;
    const httpUrl = gravatar.url(email)
    console.log(email, password)
    console.log(httpUrl)
    if (!email || !password) {
        res.json({
            status: "error",
            code:  400,
            data:{
                message: "Bad Request"
            }
        });
        return;
    } 
    const userCheck = await Users.findOne({ email })
  if (userCheck) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    }) 
  }
   const verificationToken = await addUser(email, password);
  console.log('verificationToken' +  verificationToken)
  const msg = {
    to: 'vitalii.postolov@gmail.com',
    from: 'sheremetamaryna@gmail.com',
    subject: 'No Reply',
    text: `Sending email from ${email} . Please, follow http://localhost:3000/api/auth/verify/${verificationToken} : `
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

  return res.status(201).json ({
    status: 'success',
    code: 201,
    message: 'Created',
    data:'Created'
})
};


module.exports = {createUser}