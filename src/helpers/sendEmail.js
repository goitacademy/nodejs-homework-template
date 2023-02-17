const sgMail = require("@sendgrid/mail")
require("dotenv").config()

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
// const email = {
//     to: "vahostel@gmail.com",
//     from: "kvikist@ukr.net",
//     subject: "Verify email",
//     html: `<p>Verfify email</p>`
// }
// sgMail.send(email)
// .then(()=> console.log("Email send success"))
// .catch(error => console.log(error.massage))
const sendEmail = async(data) => {
    const email = {...data, from: "kvikist@ukr.net"};
    await sgMail.send(email);
    return true;
}

module.exports = sendEmail;




/*

*/