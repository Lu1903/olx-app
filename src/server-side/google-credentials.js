const port = 3000;
const baseURL = `http://localhost:${port}`;
module.exports = {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: 'mysecret',
  baseURL,
  port,
  // The credentials and information for OAuth2
  oauth2Credentials: {
    client_id: '582908007651-dc902lu9s4pdfh5kld0oqovdpk7qkus7.apps.googleusercontent.com',
    project_id: 'olxvueapp', // The name of your project
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'XpXzCCXTCNgWdPwZftxLmx9q',
    redirect_uris: [
      `${baseURL}/auth_callback`,
      //'http://localhost:8080/dashboard',
      // 'http://localhost:3000/auth_callback',
    ],
    scopes: [
      'profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  },
};
