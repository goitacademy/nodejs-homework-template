const verificationEmailTemplate = (verifyCode) => {
  const mailSubject = "Verifying mail";
  const mailText = `Please, follow the forward link and verify your account, or make GET fetch on localhost:3030/api/users/verify/${verifyCode}`;
  return { mailSubject, mailText };
};

module.exports = verificationEmailTemplate;
