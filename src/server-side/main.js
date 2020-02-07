const express = require('express');
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const cors = require('cors');
// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2;
// Including our config file
const CONFIG = require('./server');
// Creating our express application
const app = express();
// Allowing ourselves to use cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());
// Setting up EJS Views
app.set('view engine', 'ejs');
app.set('views', __dirname);
// Listen on the port defined in the config file
app.listen(CONFIG.port, function () {
  console.log(`Listening on port ${CONFIG.port}`);
});
app.get('/link', (req, res) => {
  // eslint-disable-next-line max-len
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  // Obtain the google login link to which we'll send our users to give us access
  const loginLink = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
    scope: CONFIG.oauth2Credentials.scopes, // Using the access scopes from our config file
  });
  return res.send(loginLink);
});
// eslint-disable-next-line consistent-return
app.get('/auth_callback', (req, res) => {
  // Create an OAuth2 client object from the credentials in our config file
  // eslint-disable-next-line max-len
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  if (req.query.error) {
    // The user did not give us permission.
    return res.redirect('/');
  } else {
    oauth2Client.getToken(req.query.code, (err, token) => {
      if (err) {
        return res.redirect('/');
      }

      // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
      res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
      return res.redirect('http://localhost:8080/dashboard/');
    });
  }
});
