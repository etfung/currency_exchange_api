import application from './app'

application.listen(80, () => {
  console.log('The application is listening on port 80!');
})