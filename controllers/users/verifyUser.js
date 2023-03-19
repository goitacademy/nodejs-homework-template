const { findUser} = require('../../models/users')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const verifyUser = async (req, res) =>{
const {email} = req.body;
if (!email) {
    res.json({
        status: "error",
        code:  400,
        data:{
            message:"Missing required field email"
        }
    });
    return;
}
let user = await findUser(email);
console.log(email, user.verify)
if (!user.verify) {
  const msg = {
        to: 'vitalii.postolov@gmail.com',
        from: 'sheremetamaryna@gmail.com',
        subject: 'No Reply',
        text: `Sending email from ${email} . Please, follow http://localhost:3000/api/auth/verify/${user.verificationToken} : `
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
        res.json ({
            status : 'success',
            code: 200,
            message : "Verification email has been sent"
        })
        return;
};
res.json ({
    status : 'error',
    code: 400,
    message : "Verification has already been passed"
})

}


module.exports={verifyUser}