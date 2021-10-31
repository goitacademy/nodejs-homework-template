const app = require('../app')
const { PORT = 3000 } = process.env
// const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})
