const sgMail = require("@sendgrid/mail")

require("dotenv").config();

const {SENGIRD_API_KEY} = process.env

sgMail.setApiKey(SENGIRD_API_KEY);


const sendEmail = async(data)=>{
    const email = {...data,from: "andrijvasilkiv7@gmail.com"};
    await sgMail.send(email);
    return true
}

// const email = {
//   to: "vafom77135@rc3s.com",
//   from: "andrijvasilkiv7@gmail.com",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>"
// }

// sgMail.send(email)
// .then(()=>console.log("email send success"))
// .catch(err => console.log(err.message))

module.exports = sendEmail;