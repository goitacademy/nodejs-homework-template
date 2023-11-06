import ElasticEmail from '@elasticemail/elasticemail-client';
import 'dotenv/config';
const { ELASTIC_API_KEY, ELASTIC_FROM } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY

const api = new ElasticEmail.EmailsApi()



var callback = function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully.');
    }
};


const sendEmail = ({ to, contentType, content, subject }) => {
    const email = ElasticEmail.EmailMessageData.constructFromObject({
        Recipients: [
            new ElasticEmail.EmailRecipient(to)
        ],
        Content: {
            Body: [
                ElasticEmail.BodyPart.constructFromObject({
                    ContentType: contentType,
                    Content: content
                })
            ],
            Subject: subject,
            From: ELASTIC_FROM
        }
    });

    api.emailsPost(email, callback);
}

export default sendEmail;