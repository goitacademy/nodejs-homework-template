const verificationLetter = (email, token) => {
  return {
    to: email,
    subject: 'Please verify your registration on our website',
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${token}">Click this link for your verification approval </a>`,
  }
}

module.exports = verificationLetter