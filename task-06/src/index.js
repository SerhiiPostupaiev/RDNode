const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./dbLayer/dbService');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  express.json({
    extended: false,
  })
);

app.use(
  cookieSession({
    maxAge: 1000 * 300,
    keys: [process.env.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
};

app.use(express.static(path.join(__dirname, '/static')));

const hbs = exphbs.create({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '/static'),
  partialsDir: path.join(__dirname, '/static/partials'),
  defaultLayout: 'index',
});

app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, '/static'));
app.set('view engine', 'hbs');

app.use(allowCrossDomain);

app.use('/api/auth', require('./routes/users'));
app.use('/api/users', require('./routes/profile'));
app.use('/api/home', require('./routes/home'));

async function runServer() {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

async function main() {
  await connectDB();
  await runServer();
}

main();
