import app from './app';

const port: number = 9991;

app.listen(9991, () => {
  console.log(`Server running. Use our API on port: ${port}`)
})
