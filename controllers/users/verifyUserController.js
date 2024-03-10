// controllers/users/verifyUserController.js
import { User } from '../../models/users/userModel.js';
import { generateVerificationToken } from './registerUsersController.js';
import transporter from '../../models/shared/services/mail.service.js';

const verifyUser = async (req, res) => {
  try {
    const { email, verificationLink } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'missing required field email' });
    }

    const user = await User.findOne({ email });

    if (user.verified) {
      return res.status(400).json({ message: 'Verification has already been passed' });
    }

    const verificationToken = generateVerificationToken();
    user.verificationToken = verificationToken;
    await user.save();

    const emailOptions = {
      from: "no-reply@sandboxda33cce3c6f64200805e0f36879030b7.mailgun.org",
      to: user.email,
      subject: "Email Verification",
      html: `<p>Click the following link to verify your account:</p>
          <a target="_blank" href="${encodeURIComponent(verificationLink)}">${verificationLink}</a>`,
    };

    try {
        const response = await transporter.sendMail(emailOptions);
        console.log(response);
      } catch (error) {
        console.error('Error during sending email:', error);
        res.status(500).json({ message: 'Error during sending email' });
        return;
      }

    return res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Error during email resending:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { verifyUser };