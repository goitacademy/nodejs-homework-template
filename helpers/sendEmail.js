import ElasticEmail from "@elasticemail/elasticemail-client";
import "dotenv/config";

const { ELASTIC_API_KEY, EMAIL_FROM, BASE_URL } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
const apikey = defaultClient.authentications["apikey"];
apikey.apiKey = ELASTIC_API_KEY;

const api = new ElasticEmail.EmailsApi();

const callback = function (error, data, response) {
  if (error) {
    console.error(error.message);
  } else {
    console.log("API called successfully.");
    console.log("Email sent");
  }
};

export const sendEmail = (mailTo, verificationToken) => {
  const email = {
    Recipients: {
      To: [mailTo],
    },
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Charset: "utf-8",
          Content: `<a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank" style="font-size: 16px;">Click here to verify email</a>`,
        },
      ],
      From: EMAIL_FROM,
      Subject: "Verify email",
    },
  };

  api.emailsTransactionalPost(email, callback);
};
