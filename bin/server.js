const app = require('../app')
const db = ('mongodb+srv://Mikky:mikkypassword@cluster0.lwo3hql.mongodb.net/db-contacts?retryWrites=true&w=majority')
const PORT = process.env.PORT || 3005

const gracefulShutdown = async () => {
  console.log('Server is gracefully shutting down...')

  try {
    await db.close()
    console.error('Database connection closed.')
  } catch (err) {
    console.error('Error closing database connection:', err.message)
  }

  process.exitCode = 0 // Успішний вихід
}

// Обробка помилок при запуску сервера
try {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

  // Обробка завершення роботи сервера
  server.on('close', () => {
    console.log('Server closed')
    // Тут ви також можете викликати додаткові дії перед закриттям програми
    process.exit()
  })

  // Обробка сигналів завершення роботи
  process.on('SIGINT', gracefulShutdown)
  process.on('SIGTERM', gracefulShutdown)
} catch (err) {
  console.error('Error starting the server:', err.message)
  process.exitCode = 1 // Невдалений вихід
}
