import path from "path";
import 'dotenv/config';

const { BASE_URL } = process.env;

const htmlForValidateEmail = (verificationToken) => {
    const verificationURL = path.join(
        BASE_URL,
        'users',
        'verify',
        verificationToken,
    );
 return `
    <div style="font-family: 'Arial', sans-serif; color: #2c3e50; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ecf0f1; text-align: center;">
      <h1 style="font-size: 24px; margin-bottom: 16px;">Email Confirmation</h1>
      <p style="font-size: 16px; margin-bottom: 16px;">
        Thank you for registering with our phonebook web application. Please
        confirm your email address by clicking the button below:
      </p>
      <a
        href="${verificationURL}"
        target="_blank"
        style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease-in-out;"
      >
        Confirm Email
      </a>
      <p style="font-size: 16px; margin-top: 16px;">
        If the button does not work, copy and paste the following link into your
        browser's address bar: <br />
        <code style="background-color: #ddd; padding: 2px 4px; border-radius: 4px;">
          ${verificationURL}
        </code>
      </p>
    </div>`;
};

export default htmlForValidateEmail;