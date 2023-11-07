let ElasticEmail = require("@elasticemail/elasticemail-client");

const { config } = require("dotenv");
config();
const { ELASTICEMAIL_API_KEY } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

let email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [new ElasticEmail.EmailRecipient("oleg.kozub54@gmail.com")],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: "HTML",
        Content: "My test email content ;)",
      }),
    ],
    Subject: "JS EE lib test",
    From: "MyEmail ",
  },
});

var callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully.");
  }
};
api.emailsPost(email, callback);
