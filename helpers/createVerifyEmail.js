


const { BASE_URL} = process.env;

const createVerifyEmail = ({email, verificationToken}) => {
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">Click verify amail</a>`,
    }

    return verifyEmail;
}

export default createVerifyEmail;

