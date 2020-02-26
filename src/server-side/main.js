const express = require('express');
const cookieParser = require('cookie-parser');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const CONFIG = require('./google-credentials');
const DATABASE = require('./database-credentials');
const fs = require('fs');

const app = express();

const mysql = require('mysql');

app.use(cookieParser());
app.use(cors());
app.set('views', __dirname);
app.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));
app.use(bodyParser.json({ limit: '15mb' }));

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
  access_type: 'offline',
  scope: CONFIG.oauth2Credentials.scopes,
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
  // eslint-disable-next-line max-len
  oauth2Client.setCredentials({ access_token: tokens.access_token, refresh_token: tokens.refresh_token });
});

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
    res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret)); // , { maxAge: 60 * 1000 });
    return res.redirect('http://localhost:8080/dashboard/');
  });
});

app.get('/GoogleData', (req, response) => {
  oauth2.userinfo.get((err, res) => {
    if (err) {
      response.status(403);
    } else {
      response.send(res.data);
    }
  });
});

const con = mysql.createConnection({
  host: DATABASE.host,
  user: DATABASE.user,
  password: DATABASE.password,
  database: DATABASE.database,
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.post('/addnew', (req, res) => {
  con.query('INSERT INTO test SET ?', (req.body), (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.get('/everything', (req, res) => {
  con.query('SELECT * FROM test', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/show_mine', (req, response) => {
  oauth2.userinfo.get((err, res) => {
    if (err) {
      throw err;
    } else {
      con.query('SELECT * from test WHERE email = ?', res.data.email, (error, result) => {
        if (error) throw error;
        response.send(result);
      });
    }
  });
});

app.get('/showone/:id', (req, response) => {
  con.query('SELECT * from test WHERE id = ?', req.params.id, (error, result) => {
    if (error) throw error;
    response.send(result[0]);
  });
});

app.delete('/delete/:id', (req, response) => {
  con.query('DELETE from test WHERE id = ?', req.params.id, (error, result) => {
    if (error) throw error;
    response.send(result[0]);
  });
});
