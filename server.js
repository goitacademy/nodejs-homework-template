const app = require('./app');

const PORT = process.env.PORT ?? 6870;

app.listen(PORT, () => {
  console.log('\x1b[33m%s\x1b[0m', `⚡⚡⚡ Server is running on port: ${PORT} ⚡⚡⚡`)
})
