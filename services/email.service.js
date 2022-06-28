const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
const { SEND_GRID_API_KEY, PORT = 3000 } = process.env;
const BASE_URL = `http://localhost:${PORT}/api`

const sendEmail = async (userEmail, code) => {
  
    sgMail.setApiKey(SEND_GRID_API_KEY);
    const link = `${BASE_URL}/auth/verify/${code}`
    
  const msg = {
    to: userEmail, // Change to your recipient
    from: "sergcocorin61@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    html: `<h4>Click on this link to confirm registration ${link}</h4>`,
    };
    
    try {
        const result = await sgMail.send(msg);
        console.log('result', result);
    } catch(error) {
        console.error("ERROR", error);
        throw error;
    };
};

module.exports = {
  sendEmail
};
