const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return moment().format('LL');
});

hbs.registerHelper('toUpperCase', text => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var log = `Visitted: ${moment().format(
    'LLLL'
  )} Medtod: ${req.method} Path: ${req.path}`;
  fs.appendFile('log.txt', log + '\n', (err, data) => {
    if (err) {
      console.log('Unable to log to log file.');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Webpage',
    currentYear: new Date().getFullYear()
  });
});

app.get('projects', (req, res) => {
  res.render('projects');
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/json', (req, res) => {
  res.send({
    name: 'Natwipool',
    likes: ['biking', 'fishing']
  });
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
