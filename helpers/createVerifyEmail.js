const { BASE_URL } = process.env;

const createVerifyEmail = (verificationToken, email) => {
    const verifyLink = `${BASE_URL}/users/verify/${verificationToken}`;
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<h2>Hi! Click by link below to verify your email</h2>
        <a href=${verifyLink} target="_blank">Verify</a>`,
    };
    return verifyEmail;
};

module.exports = createVerifyEmail;
