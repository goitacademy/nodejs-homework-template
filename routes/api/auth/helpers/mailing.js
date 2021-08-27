const sgMail = require("@sendgrid/mail");

class MailingClieng {
  async sendVerificationEmail(email, verificationToken) {
    this.setKey();

    const verificationLink = `${process.env.API_BASE_URL}/users/verify/${verificationToken}`;

    return sgMail.send({
      from: process.env.SERDGRID_SENDER,
      to: email,
      subject: "email verification needed",
      html: `<a href="${verificationLink}">verify email</a>`,
    });
  }
  setKey() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
}

module.exports.mailingClieng = new MailingClieng();
