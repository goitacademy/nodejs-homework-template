const Handlebars = require("handlebars");

const { BASE_URL } = process.env;

const template = ` <h1 style="color: #333333; text-align: center">Email Confirmation</h1>
        <p style="color: #555555;">Dear <i>{{email}}</i>,</p>
        <p style="color: #555555;">Your email address has been used to register for our application <strong>ContactBook</strong>. To complete the registration process and have full access to all features, please
        <a href="${BASE_URL}/users/verify/{{verificationToken}}" style="color: #007bff; text-decoration: none;">confirm your email address here</a>.</p>
        <p style="color: #555555;">If you did not sign up for our application, please disregard this email. Thank you for your understanding.</p>
        <p style="color: #555555;">Best regards, <strong>Code Crafters</strong></p>`;

const messageVerify = Handlebars.compile(template);

module.exports = messageVerify;
