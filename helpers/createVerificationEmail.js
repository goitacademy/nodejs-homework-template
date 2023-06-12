const { BASE_URL, PORT } = process.env;

const createVerificationEmail = (verificationToken, email) => {
    const verifyLink = `${BASE_URL}:${PORT}/users/verify/${verificationToken}`;
    
    return {
        to: email,
        subject: 'Verification email',
        // html: `<a target="_blank" href="${verifyLink}">Click to verify your email</a>`
        html: verifyLink
    }
}

module.exports = createVerificationEmail;