const app = require('./app')
const { initFolders } = require('./utils/createFolder')

app.listen(3000, async () => {
  await initFolders()
  console.log("Server running. Use our API on port: 3000")
})
