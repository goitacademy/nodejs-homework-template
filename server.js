import app from './app.js';

const SERVER_PORT = 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}\nmode: ${app.get('env')}`);
});
