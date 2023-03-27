const createEmail = (email, token) => {
  return {
    to: email,
    subject: "Email verification",
    html: `<center>
    <p>Please confirm your email address by clicking on the button below.</p>
    <p>👉  <a href="http://localhost:3000/api/users/verify/${token}" style="display: inline-block; background-color: green; color: white; padding: 10px 25px; border-radius: 5px; text-decoration:none;">CONFIRM EMAIL</a>  👈</p>
    <p style="color: grey;">If you have not registered on our website, you can ignore this message.</p>
  </center>`,
  };
};

module.exports = createEmail;
