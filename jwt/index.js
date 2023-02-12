const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asadsfsdf@$$!q'; // shoud be in .env file - secret information!

async function main() {
  // Ex1 - generate

  const payload = { id: 123 };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15s', // 15 sec
  });
  console.log('token', token);

  // Ex2 - check if valid

  //   try {
  //     const res = jwt.verify(token, JWT_SECRET);
  //     console.log("res", res);
  //   } catch (error) {
  //     console.error('verification error:', error);
  //   }

  // Ex3 - check if valid - expired error

  // try {
  //     const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE2NzYxMzgxMDYsImV4cCI6MTY3NjEzODEyMX0.8IxuM-sfSxDCg6UvfGeMFiwr88mhyNkg_yfW1ug6EU4"
  //     const res = jwt.verify(expiredToken, JWT_SECRET);
  //     console.log("res", res);
  //   } catch (error) {
  //     console.error('verification error 2:', error.name, error);
  //   }

  // Ex4 - check if valid - invalid signature

  try {
    const invalidToken = token + 'AAA';
    const res = jwt.verify(invalidToken, JWT_SECRET);
    console.log('res', res);
  } catch (error) {
    console.error('verification error 3:', error.name, error);
  }
}

main();
