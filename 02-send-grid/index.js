require('dotenv').config();

const sendGrid = require('@sendgrid/mail');

const { SEND_GRID_KEY } = process.env;

async function main() {
  try {
    sendGrid.setApiKey(SEND_GRID_KEY);

    const email = {
      from: 'maximdm22@gmail.com',
      to: 'maximdm22@gmail.com',
      subject: 'Sengrid Test',
      html: '<h1> Hello there!! </h1>',
      text: 'Hello there!!',
    };

    const response = await sendGrid.send(email);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

main();
