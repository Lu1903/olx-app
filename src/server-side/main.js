const express = require('express');
const cookieParser = require('cookie-parser');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const CONFIG = require('./google-credentials');

const app = express();

// const mysql = require('mysql');

app.use(cookieParser());
app.use(cors());
app.set('views', __dirname);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Listen on the port defined in the config file
app.listen(CONFIG.port, () => {
  console.log(`Listening on port ${CONFIG.port}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// eslint-disable-next-line max-len
const oauth2Client = new google.auth.OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
const loginLink = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
  scope: CONFIG.oauth2Credentials.scopes, // Using the access scopes from our config file
});

const oauth2 = google.oauth2({
  auth: oauth2Client,
  version: 'v2',
});

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log('Refresh token: ');
    console.log(tokens.refresh_token);
  }
  console.log('Access token: ');
  console.log(tokens.access_token);
  oauth2Client.setCredentials({ access_token: tokens.access_token });
});



/* const con = mysql.createConnection({
  host: 'localhost',
  user: 'newuser',
  password: 'B0813aran()16',
  database: 'olx-app',
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
}); */

app.get('/link', (req, res) => res.send(loginLink));

// eslint-disable-next-line consistent-return
app.get('/auth_callback', (req, res) => {
  // eslint-disable-next-line max-len
  if (req.query.error) {
    // The user did not give us permission.
    return res.redirect('/');
  }
  oauth2Client.getToken(req.query.code, (err, token) => {
    if (err) {
      return res.redirect('/');
    }

    // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
    // res.setHeader('Cache-Control', 'private');
    res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret, { expiresIn: 60 * 60 * 24 }))//, { domain: 'localhost', path: '/base', httpOnly: true });
    // res.header('Authorization', `Bearer ${token.access_token}`);
    return res.redirect('http://localhost:8080/dashboard/');
  });
});

/* app.post('/user', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
  con.query('INSERT INTO test SET ?', (req.body), (err, result) => {
    if (err) throw err;
  });
}); */

app.get('/test', (req, response) => {
  oauth2.userinfo.get((err, res) => {
    if (err) {
      console.log(err);
    }else {
      console.log(res);
      response.send(res.data.email);
    }
  });
});
