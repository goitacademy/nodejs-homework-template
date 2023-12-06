const { ELASTICEMAIL_API_KEY } = process.env;

const ElasticEmail = require("@elasticemail/elasticemail-client");

const defaultClient = ElasticEmail.ApiClient.instance;

const apikey = defaultClient.authentications.apikey;
apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [new ElasticEmail.EmailRecipient("maliv65188@jalunaki.com")],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: "HTML",
        Content: "My test email content ;)",
      }),
    ],
    Subject: "Number 2",
    From: "artem1145819@gmail.com ",
  },
});

const callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully.");
  }
};
api.emailsPost(email, callback);
