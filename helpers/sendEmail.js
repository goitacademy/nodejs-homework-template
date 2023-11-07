let ElasticEmail = require("@elasticemail/elasticemail-client");

let defaultClient = ElasticEmail.ApiClient.instance;

let apikey = defaultClient.authentications["apikey"];
apikey.apiKey = "895A382DF3DCC13A97E72EXAMPLEKEY";

let api = new ElasticEmail.EmailsApi();

let email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [new ElasticEmail.EmailRecipient("MeowWow ")],
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
